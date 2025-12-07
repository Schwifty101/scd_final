require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fileDB = require('./file');
const recordUtils = require('./record');
const vaultEvents = require('../events');
const mongoDriver = require('./mongo');
const { dbFile } = fileDB;

const useMongo = Boolean(process.env.MONGO_URI);

function getDataWithMetadata() {
  const data = fileDB.readDB();
  let mutated = false;

  const normalized = data.map(record => {
    if (!record.createdAt) {
      mutated = true;
      const derivedDate = new Date(Number(record.id) || Date.now()).toISOString();
      return { ...record, createdAt: derivedDate };
    }
    return record;
  });

  if (mutated) {
    fileDB.writeDB(normalized);
  }

  return normalized;
}

function addRecord({ name, value }) {
  recordUtils.validateRecord({ name, value });
  const data = getDataWithMetadata();
  const newRecord = { id: recordUtils.generateId(), name, value, createdAt: new Date().toISOString() };
  data.push(newRecord);
  fileDB.writeDB(data);
  vaultEvents.emit('recordAdded', newRecord);
  return newRecord;
}

function listRecords() {
  return getDataWithMetadata();
}

function updateRecord(id, newName, newValue) {
  const data = getDataWithMetadata();
  const record = data.find(r => r.id === id);
  if (!record) return null;
  record.name = newName;
  record.value = newValue;
  fileDB.writeDB(data);
  vaultEvents.emit('recordUpdated', record);
  return record;
}

function deleteRecord(id) {
  let data = getDataWithMetadata();
  const record = data.find(r => r.id === id);
  if (!record) return null;
  data = data.filter(r => r.id !== id);
  fileDB.writeDB(data);
  vaultEvents.emit('recordDeleted', record);
  return record;
}

// Search records by keyword (matches name or ID)
function searchRecords(keyword) {
  const data = getDataWithMetadata();
  const lowerKeyword = keyword.toLowerCase();

  return data.filter(record => {
    const nameMatch = record.name.toLowerCase().includes(lowerKeyword);
    const valueMatch = String(record.value).toLowerCase().includes(lowerKeyword);
    const idMatch = record.id.toString().includes(keyword);
    return nameMatch || valueMatch || idMatch;
  });
}

// Return a sorted copy of records by field and direction
function sortRecords(field, direction = 'asc') {
  const data = getDataWithMetadata();
  const dir = direction.toLowerCase() === 'desc' ? -1 : 1;

  const compare = (a, b) => {
    if (field === 'createdAt') {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (dateA < dateB) return -1 * dir;
      if (dateA > dateB) return 1 * dir;
      return 0;
    }

    const valA = field === 'id' ? Number(a.id) : String(a[field]).toLowerCase();
    const valB = field === 'id' ? Number(b.id) : String(b[field]).toLowerCase();

    if (valA < valB) return -1 * dir;
    if (valA > valB) return 1 * dir;
    return 0;
  };

  return data.slice().sort(compare);
}

function exportToText() {
  const data = getDataWithMetadata();
  const exportFile = path.join(__dirname, '..', 'export.txt');
  const now = new Date().toISOString();

  const header = [
    'NodeVault Export',
    `Generated: ${now}`,
    `Total Records: ${data.length}`,
    `File: ${path.basename(exportFile)}`,
    '------------------------------'
  ];

  const body = data.map(record => {
    return `ID: ${record.id} | Name: ${record.name} | Value: ${record.value} | Created: ${record.createdAt}`;
  });

  const content = header.concat(body).join('\n');
  fs.writeFileSync(exportFile, content, 'utf8');
  return exportFile;
}

async function backupSnapshot(data) {
  const backupsDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupsDir, `backup_${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`[BACKUP] Snapshot created: ${path.basename(backupFile)}`);
}

async function addRecordWrapper(payload) {
  if (useMongo) {
    const rec = await mongoDriver.addRecord(payload);
    vaultEvents.emit('recordAdded', rec);
    const data = await mongoDriver.listRecords();
    await backupSnapshot(data);
    return rec;
  }
  const rec = addRecord(payload);
  const data = listRecords();
  await backupSnapshot(data);
  return rec;
}

async function listRecordsWrapper() {
  return useMongo ? mongoDriver.listRecords() : Promise.resolve(listRecords());
}

async function updateRecordWrapper(id, newName, newValue) {
  if (useMongo) {
    const rec = await mongoDriver.updateRecord(id, newName, newValue);
    if (rec) vaultEvents.emit('recordUpdated', rec);
    return rec;
  }
  const rec = updateRecord(id, newName, newValue);
  return rec;
}

async function deleteRecordWrapper(id) {
  if (useMongo) {
    const rec = await mongoDriver.deleteRecord(id);
    if (rec) {
      vaultEvents.emit('recordDeleted', rec);
      const data = await mongoDriver.listRecords();
      await backupSnapshot(data);
    }
    return rec;
  }
  const rec = deleteRecord(id);
  if (rec) {
    const data = listRecords();
    await backupSnapshot(data);
  }
  return rec;
}

async function searchRecordsWrapper(keyword) {
  return useMongo ? mongoDriver.searchRecords(keyword) : Promise.resolve(searchRecords(keyword));
}

async function sortRecordsWrapper(field, direction = 'asc') {
  return useMongo ? mongoDriver.sortRecords(field, direction) : Promise.resolve(sortRecords(field, direction));
}

async function exportToTextWrapper() {
  const data = await listRecordsWrapper();
  const exportFile = path.join(__dirname, '..', 'export.txt');
  const now = new Date().toISOString();

  const header = [
    'NodeVault Export',
    `Generated: ${now}`,
    `Total Records: ${data.length}`,
    `File: ${path.basename(exportFile)}`,
    '------------------------------'
  ];

  const body = data.map(record => {
    return `ID: ${record.id} | Name: ${record.name} | Value: ${record.value} | Created: ${record.createdAt}`;
  });

  const content = header.concat(body).join('\n');
  fs.writeFileSync(exportFile, content, 'utf8');
  return exportFile;
}

async function getStatisticsWrapper() {
  const data = await listRecordsWrapper();
  const totalRecords = data.length;
  const longest = data.reduce(
    (acc, r) => (r.name && r.name.length > acc.length ? r.name : acc),
    ''
  );
  const earliest = totalRecords
    ? data.map(r => new Date(r.createdAt)).sort((a, b) => a - b)[0].toISOString()
    : 'N/A';
  const latest = totalRecords
    ? data.map(r => new Date(r.createdAt)).sort((a, b) => b - a)[0].toISOString()
    : 'N/A';

  let lastModified = 'N/A';
  if (!useMongo) {
    try {
      const stats = fs.statSync(dbFile);
      lastModified = stats.mtime.toISOString();
    } catch (err) {
      // ignore
    }
  }

  return {
    totalRecords,
    lastModified,
    longestName: longest || 'N/A',
    longestNameLength: longest ? longest.length : 0,
    earliest,
    latest
  };
}

module.exports = {
  addRecord: addRecordWrapper,
  listRecords: listRecordsWrapper,
  updateRecord: updateRecordWrapper,
  deleteRecord: deleteRecordWrapper,
  searchRecords: searchRecordsWrapper,
  sortRecords: sortRecordsWrapper,
  exportToText: exportToTextWrapper,
  getStatistics: getStatisticsWrapper
};
