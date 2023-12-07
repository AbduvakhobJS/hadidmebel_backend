const {Router} = require('express')
const {createPromotionDate, Delete,getOne,getAll,update} = require("../controller/promotion_date_controller");
const router = Router()

router.get("/all", getAll)
router.post("/create",  createPromotionDate)
router.get("/:id", getOne)
router.put("/:id", update)
router.delete("/:id", Delete)



module.exports = router