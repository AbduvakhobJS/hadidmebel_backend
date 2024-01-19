const express = require('express')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');
const {createPromotion, UpdatePromotion, getAllPromotion, getPromotion, deletePromotion} = require("../controller/promotionController");
const router = express.Router()



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/promotions')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), createPromotion)
router.get('/all', getAllPromotion )
router.put('/:id', upload.array("FILE"), UpdatePromotion)
router.get('/:id',  getPromotion)
router.delete('/:id', deletePromotion  )

module.exports = router