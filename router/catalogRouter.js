
const express = require('express')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');
const {createCatalog, UpdateCatalog, getAllCatalogs, getCatalog, deleteCatalog, FindByCatalog} = require("../controller/catalogController");
const router = express.Router()



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/catalogs')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), createCatalog)
router.post('/find', FindByCatalog)
router.get('/all', getAllCatalogs )
router.put('/:id', upload.array("FILE"), UpdateCatalog)
router.get('/:id',  getCatalog)
router.delete('/:id', deleteCatalog  )

module.exports = router