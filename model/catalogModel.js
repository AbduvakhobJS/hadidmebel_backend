const mongoose = require('mongoose')
const {Schema, model} = require("mongoose")
const CatalogSchema = mongoose.Schema({
    image:[{
        type: String,
    }],
    name: {
        type: String,
    }
}, {timestamps: true})

module.exports = model('catalog', CatalogSchema)

