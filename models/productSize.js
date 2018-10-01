const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSizeSchema = new Schema({

    id: {
        type: Number,
        index: true,
        required: true
    },
    sizeSystem: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('ProductSize', productSizeSchema, 'ProductSizes');
