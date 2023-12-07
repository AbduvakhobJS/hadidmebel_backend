const mongoose = require('mongoose')
const {model, Schema} = require('mongoose')

const OrderSchema = mongoose.Schema({
    product_Id: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: true
    },
    product_name: {
    type: String
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now() }
})

module.exports = model('order', OrderSchema)