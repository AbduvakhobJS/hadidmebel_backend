const path = require('path')
const fs = require('fs')
const MaterialModel = require('../model/materialsModel')

const createMaterial = async (req, res) => {
    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const {  title, description} = req.body
    const material = new MaterialModel({
        description: description,
        title: title,
        image: arrayFiles
    })
    material.save()
        .then(() => res.json(material))
        .catch((e) => res.json(e))
}

const getAllMaterials = async (req, res) => {
    const materials = await MaterialModel.find()
        .then((materials) => {
            res.json(materials)
        })
        .catch((e) => {
            console.log(e)
        })
}


const getMaterial = async (req, res) => {
    const material = await MaterialModel.findById(req.params.id)
        .then((material) => {
            res.json(material)
        })
        .catch((e) => {
            console.log(e)
        })
}

const UpdateMaterial = async (req, res) => {
    const { id } = req.params
    const {description, title} = req.body
    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }

    // 1.eski faylni o'chirish
    const trashFile = await MaterialModel.findById(id)
    const trashImage = trashFile.image
    for (let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/materials/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayl o'chdi")
        })
    }
    // 2.yangi faylni yuklash

    const updateFile = await MaterialModel.findByIdAndUpdate(id)
    updateFile.image = arrayFiles
    updateFile.title = title
    updateFile.description = description

    updateFile.save()
        .then(() => {
            res.json(updateFile)
        })
        .catch((e) => {
            res.json(e)
        })
}


const deleteMaterial = async (req, res) => {
    const { id } = req.params;
    // 1.eski faylni o'chirish
    const trashFile = await MaterialModel.findById(id)
    const trashImage = trashFile.image
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/materials/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayllar o'chdi")
        })
    }

    // 2.malumotni bazadan o'chirish
    await MaterialModel.findByIdAndDelete(id)
    res.json({
        message: "Malumot ochdi"
    })

}

module.exports = { createMaterial, UpdateMaterial, getAllMaterials, getMaterial, deleteMaterial }