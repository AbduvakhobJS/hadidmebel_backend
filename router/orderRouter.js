const {Router} = require('express')
const { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder} = require("../controller/orderController");
const router = Router()

router.get("/all", getAllOrders)
router.post("/create", createOrder)
router.get("/:id", getOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)



module.exports = router