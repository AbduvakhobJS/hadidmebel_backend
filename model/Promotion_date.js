const mongoose = require('mongoose')
const {model, Schema} = require('mongoose')
const PromotionDateSchema = mongoose.Schema({
    promotion_name: {
        type: String,
        required: true
    },
    promotion_date: {
        type: String,
        required: true
    },
    date: {type: Date, default: Date.now()}
},{timestamps: true})

module.exports = model('promotion_date', PromotionDateSchema)
