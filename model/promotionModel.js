const mongoose = require('mongoose')
const {model, Schema} = require('mongoose')

const PromotionSchema = mongoose.Schema({
    image: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    before_price: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


module.exports = model('promotion', PromotionSchema)
