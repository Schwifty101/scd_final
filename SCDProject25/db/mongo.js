const mongoose = require('mongoose');
const recordUtils = require('./record');

let connected = false;

async function init() {
    if (connected) return;
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not set');
    await mongoose.connect(uri, { dbName: process.env.MONGO_DB || undefined });
    connected = true;
}

const recordSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);

async function addRecord({ name, value }) {
    await init();
    recordUtils.validateRecord({ name, value });
    const newRecord = {
        id: recordUtils.generateId(),
        name,
        value,
        createdAt: new Date()
    };
    const doc = await Record.create(newRecord);
    return doc.toObject();
}

async function listRecords() {
    await init();
    const docs = await Record.find({}).lean();
    return docs;
}

async function updateRecord(id, newName, newValue) {
    await init();
    const doc = await Record.findOneAndUpdate(
        { id },
        { name: newName, value: newValue },
        { new: true }
    ).lean();
    return doc || null;
}

async function deleteRecord(id) {
    await init();
    const doc = await Record.findOneAndDelete({ id }).lean();
    return doc || null;
}

async function searchRecords(keyword) {
    await init();
    const regex = new RegExp(keyword, 'i');
    const docs = await Record.find({
        $or: [
            { name: regex },
            { value: regex },
            { id: Number(keyword) || -1 }
        ]
    }).lean();
    // Allow partial id string matches as well
    return docs.filter(r => r.id.toString().includes(keyword) || regex.test(r.name) || regex.test(r.value));
}

async function sortRecords(field, direction = 'asc') {
    await init();
    const dir = direction === 'desc' ? -1 : 1;
    const sortField = field === 'createdAt' ? 'createdAt' : field;
    const docs = await Record.find({}).sort({ [sortField]: dir }).lean();
    return docs;
}

module.exports = { addRecord, listRecords, updateRecord, deleteRecord, searchRecords, sortRecords };