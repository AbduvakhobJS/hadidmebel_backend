const Promotion_Date = require('../model/Promotion_date')

const createPromotionDate = async (req, res) => {
    const {promotion_name, promotion_date} = req.body
    const promotion_dates = await new Promotion_Date({
        promotion_name, promotion_date
    })
    await promotion_dates.save()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
}

const getAll = async (req, res) => {
    const result = await Promotion_Date.find()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
}

const getOne = async (req, res) => {
    const result = await Promotion_Date.findById(req.params.id)
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(result)
        })
}


const update = async (req, res) => {
    const {promotion_name, promotion_date} = req.body
    const result = await Promotion_Date.findByIdAndUpdate(req.params.id,{
        promotion_name,
        promotion_date
    })
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
}


const Delete = async (req, res) => {
    const result = await Promotion_Date.findOneAndDelete(req.params.id)
        .then((result) => {
            res.json({message: "Malumot o'chdi"})
        })
        .catch((error) => {
            res.json(error)
        })
}



module.exports = {createPromotionDate, getAll, getOne, update, Delete}