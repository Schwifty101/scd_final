const fileDB = require('./file');
const recordUtils = require('./record');
const vaultEvents = require('../events');

function addRecord({ name, value }) {
  recordUtils.validateRecord({ name, value });
  const data = fileDB.readDB();
  const newRecord = { id: recordUtils.generateId(), name, value };
  data.push(newRecord);
  fileDB.writeDB(data);
  vaultEvents.emit('recordAdded', newRecord);
  return newRecord;
}

function listRecords() {
  return fileDB.readDB();
}

function updateRecord(id, newName, newValue) {
  const data = fileDB.readDB();
  const record = data.find(r => r.id === id);
  if (!record) return null;
  record.name = newName;
  record.value = newValue;
  fileDB.writeDB(data);
  vaultEvents.emit('recordUpdated', record);
  return record;
}

function deleteRecord(id) {
  let data = fileDB.readDB();
  const record = data.find(r => r.id === id);
  if (!record) return null;
  data = data.filter(r => r.id !== id);
  fileDB.writeDB(data);
  vaultEvents.emit('recordDeleted', record);
  return record;
}

// Search records by keyword (matches name or ID)
function searchRecords(keyword) {
  const data = fileDB.readDB();
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
  const data = fileDB.readDB();
  const dir = direction.toLowerCase() === 'desc' ? -1 : 1;

  const compare = (a, b) => {
    const valA = field === 'id' ? Number(a.id) : String(a[field]).toLowerCase();
    const valB = field === 'id' ? Number(b.id) : String(b[field]).toLowerCase();

    if (valA < valB) return -1 * dir;
    if (valA > valB) return 1 * dir;
    return 0;
  };

  return data.slice().sort(compare);
}

module.exports = { addRecord, listRecords, updateRecord, deleteRecord, searchRecords, sortRecords };
