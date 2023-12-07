const path = require('path')
const fs = require('fs')
const CatalogModel = require('../model/catalogModel')
const ProductModel = require("../model/productModel");

const FindByCatalog = async (req, res) => {
    const {catalog_Id} = req.body
    const product = await ProductModel.find({catalog_Id: catalog_Id})
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}
const createCatalog = async (req, res, next) => {
    const { name } = req.body
    const files = req.files;
    const arrayFiles = []
    for (const file of files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const catalog = new CatalogModel({
        name,
        image: arrayFiles
    })
    catalog.save()
        .then(() => res.json(catalog))
        .catch((e) => res.json(e))
}

const getAllCatalogs = async (req, res) => {
    const catalog = await CatalogModel.find()
        .then((catalog) => {
            res.json(catalog)
        })
        .catch((e) => {
            console.log(e)
        })
}


const getCatalog = async (req, res) => {
    const catalog = await CatalogModel.findById(req.params.id)
        .then((catalog) => {
            res.json(catalog)
        })
        .catch((e) => {
            console.log(e)
        })
}

const UpdateCatalog = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const trashFile = await CatalogModel.findById(id)
    const trashImage = trashFile.image
    for (let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/catalogs/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayl o'chdi")
        })
    }
    // const files = req.files;
    const arrayFiles = []
    for (const file of req.files) {
        const { filename } = file
        arrayFiles.push(filename)
    }
    const updateFile = await CatalogModel.findByIdAndUpdate(id)
    updateFile.image = arrayFiles
    updateFile.name = name

    updateFile.save()
        .then(() => {
            res.json(updateFile)
        })
        .catch((e) => {
            res.json(e)
        })



    // await CatalogModel.findById({_id: id})
    //     .select({image: 1})
    //     .exec(async (error,data) => {
    //         if (error) throw error;
    //         else {
    //             const image = data.image
    //             const PathFile = path.join(__dirname,`../public/catalogs/${image}`)
    //             fs.unlink(PathFile,function (error){
    //                 if (error) throw error;
    //                 else{
    //                     console.log("Eski fayl o'chdi")
    //                 }
    //             })
    //         }
    //     })



        // await CatalogModel.findByIdAndUpdate({_id: id}).exec(async (error, data) => {
        //     if (error) {
        //         res.json(error)
        //     }
        //     else {
        //         const {name} = req.body
        //         data.name = name
        //         data.image = req.file.filename
        //         await data.save()
        //             .then(() => {
        //                 res.json(data)
        //             })
        //             .catch((e) => {
        //                 res.json(e)
        //             })
        //     }
        // })
    // const { name } = req.body
    //
    // // 1.eski faylni o'chirish
    // const trashFile = await CatalogModel.findById(id)
    // const trashImage = trashFile.image
    // for (let item of trashImage) {
    //     const trashPath = path.join(__dirname, `../public/catalogs/${item}`)
    //     fs.unlink(trashPath, function (e) {
    //         console.log("Fayl o'chdi")
    //     })
    // }
    // // 2.yangi faylni yuklash
    //
    //
    // const updateFile = await CatalogModel.findByIdAndUpdate(id)
    // updateFile.image = req.file.filename
    // updateFile.name = name
    //
    // updateFile.save()
    //     .then(() => {
    //         res.json(updateFile)
    //     })
    //     .catch((e) => {
    //         res.json(e)
    //     })
}



const deleteCatalog = async (req, res) => {
    const { id } = req.params;
    // 1.eski faylni o'chirish
    const trashFile = await CatalogModel.findById(id)
    const trashImage = trashFile.image
    for(let item of trashImage) {
        const trashPath = path.join(__dirname, `../public/catalogs/${item}`)
        fs.unlink(trashPath, function (e) {
            console.log("Fayllar o'chdi")
        })
    }

    // 2.malumotni bazadan o'chirish
    await CatalogModel.findByIdAndDelete(id)
    res.json({
        message: "Malumot ochdi"
    })

}

module.exports = { createCatalog, UpdateCatalog, getAllCatalogs, getCatalog, deleteCatalog, FindByCatalog }