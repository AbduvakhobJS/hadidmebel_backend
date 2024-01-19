const path = require('path')
const fs = require('fs')
const ProductModel = require('../model/productModel')




const createProduct = async (req, res) => {
    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const { catalog_Id, catalog_name, title, price, size, color, material, description, bonus} = req.body
    const product = new ProductModel({
        catalog_Id, catalog_name, title, price, size , color, material, description, bonus,
        image: arrayFiles
    })
    product.save()
        .then(() => res.json(product))
        .catch((e) => res.json(e))
}

const getAllProducts = async (req, res) => {
    const materials = await ProductModel.find()
        .then((materials) => {
            res.json(materials)
        })
        .catch((e) => {
            console.log(e)
        })
}


const getProduct = async (req, res) => {
    const material = await ProductModel.findById(req.params.id)
        .then((material) => {
            res.json(material)
        })
        .catch((e) => {
            console.log(e)
        })
}

const UpdateProduct = async (req, res) => {
    const { id } = req.params
    const {catalog_Id, catalog_name, title, price, size, color, material, description, bonus} = req.body

    // 1.eski faylni o'chirish
    const trashFile = await ProductModel.findById(id)
    const trashImage = trashFile.image
    for (let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/products/${item}`)
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
    const updateFile = await ProductModel.findByIdAndUpdate(id)
    updateFile.image = arrayFiles
    updateFile.catalog_Id = catalog_Id
    updateFile.catalog_name = catalog_name
    updateFile.title = title
    updateFile.price = price
    updateFile.material = material
    updateFile.description = description
    updateFile.color = color
    updateFile.size = size 
    updateFile.bonus = bonus

    updateFile.save()
        .then(() => {
            res.json(updateFile)
        })
        .catch((e) => {
            res.json(e)
        })
}


const deleteProduct = async (req, res) => {
    const { id } = req.params;
    // 1.eski faylni o'chirish
    const trashFile = await ProductModel.findById(id)
    const trashImage = trashFile.image
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/products/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayllar o'chdi")
        })
    }

    // 2. malumotni bazadan o'chirish
    await ProductModel.findByIdAndDelete(id)
    res.json({
        message: "Malumot ochdi"
    })

}

module.exports = { createProduct, UpdateProduct, getAllProducts, getProduct, deleteProduct }