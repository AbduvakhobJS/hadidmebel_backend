
const express = require('express')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');
const {createMaterial, UpdateMaterial, getAllMaterials, getMaterial, deleteMaterial} = require("../controller/materialController");
const router = express.Router()



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/materials')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), createMaterial)
router.get('/all', getAllMaterials )
router.put('/:id', upload.array("FILE"), UpdateMaterial)
router.get('/:id',  getMaterial)
router.delete('/:id', deleteMaterial  )

module.exports = router