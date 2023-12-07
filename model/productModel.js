const mongoose = require('mongoose')
const {model, Schema} = require('mongoose')
const Product = mongoose.Schema({
    catalog_Id: {
        type: mongoose.Schema.ObjectId,
        ref: "catalog",
        required: true
    },
    catalog_name: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pagonametr: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    fasad: {
        type: String,
        required: true
    },
    staleshnitsa: {
        type: String,
        required: true
    },
    bonus: {
        type: String,
        required: true
    }
})

module.exports = model('product', Product)