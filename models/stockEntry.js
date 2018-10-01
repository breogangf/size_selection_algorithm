const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockEntrySchema = new Schema({

    sizeId: {
        type: Number,
        index: true,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('StockEntry', stockEntrySchema, 'StockEntries');
