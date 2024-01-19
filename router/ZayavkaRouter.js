const {Router} = require('express')
const { createZayavka, getAllZayavkas, getZayavka, updateZayavka, deleteZayavka} = require("../controller/zayavkaController");
const router = Router()

router.get("/all", getAllZayavkas)
router.post("/create",  createZayavka)
router.get("/:id", getZayavka)
router.put("/:id", updateZayavka)
router.delete("/:id", deleteZayavka)



module.exports = router