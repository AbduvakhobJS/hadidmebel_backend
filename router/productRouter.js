const express = require('express')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');
const {createProduct, UpdateProduct, getAllProducts, getProduct, deleteProduct} = require("../controller/productController");
const router = express.Router()



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/products')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), createProduct)
router.get('/all', getAllProducts )
router.put('/:id', upload.array("FILE"), UpdateProduct)
router.get('/:id',  getProduct)
router.delete('/:id', deleteProduct  )

module.exports = router