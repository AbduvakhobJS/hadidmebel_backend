const {model} = require('mongoose')
const mongoose = require('mongoose')
const ZayavkaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
},{timestamps: true})

module.exports = model("zayavka", ZayavkaSchema)