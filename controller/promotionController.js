const path = require('path')
const fs = require('fs')
const PromotionModel = require('../model/promotionModel')


const createPromotion = async (req, res) => {
    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const { description, title, price, before_price, material } = req.body
    const promotion = new PromotionModel({
        description, title, price, before_price, material ,
        image: arrayFiles
    })
    promotion.save()
        .then(() => res.json(promotion))
        .catch((e) => res.json(e))
}

const getAllPromotion = async (req, res) => {
    const promotion = await PromotionModel.find()
        .then((promotion) => {
            res.json(promotion)
        })
        .catch((e) => {
            console.log(e)
        })
}


const getPromotion = async (req, res) => {
    const promotion = await PromotionModel.findById(req.params.id)
        .then((promotion) => {
            res.json(promotion)
        })
        .catch((e) => {
            console.log(e)
        })
}

const UpdatePromotion = async (req, res) => {
    const { id } = req.params
    const {description, title, price, before_price, material } = req.body

    // 1.eski faylni o'chirish
    const trashFile = await PromotionModel.findById(id)
    const trashImage = trashFile.image
    for (let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/promotions/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayl o'chdi")
        })
    }
    // 2.yangi faylni yuklash

    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const {filename} = file
        arrayFiles.push(filename)
    }
    const updateFile = await PromotionModel.findByIdAndUpdate(id)
    updateFile.image = arrayFiles
    updateFile.title = title
    updateFile.price = price
    updateFile.before_price = before_price
    updateFile.description = description
    updateFile.material = material


    updateFile.save()
        .then(() => {
            res.json(updateFile)
        })
        .catch((e) => {
            res.json(e)
        })
}


const deletePromotion = async (req, res) => {
    const { id } = req.params;
    // 1.eski faylni o'chirish
    const trashFile = await PromotionModel.findById(id)
    const trashImage = trashFile.image
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/promotions/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayllar o'chdi")
        })
    }

    // 2.malumotni bazadan o'chirish
    await PromotionModel.findByIdAndDelete(id)
    res.json({
        message: "Malumot ochdi"
    })
}

module.exports = { createPromotion, UpdatePromotion, getAllPromotion, getPromotion, deletePromotion }