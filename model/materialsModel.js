
const mongoose = require("mongoose");
const {model} = require("mongoose");

const MaterialSchema = mongoose.Schema({
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
    }
},{timestamps: true})

module.exports = model("material", MaterialSchema)