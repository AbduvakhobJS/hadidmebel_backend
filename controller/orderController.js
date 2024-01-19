const { bot } = require('../bot/bot')
const OrderModel = require('../model/orderModel')


//Malumot yaratish
const createOrder = async (req, res) => {
    const { product_Id, product_name, name, phone } = req.body
    if(product_Id === "" || product_name === "" || name === "" || phone === "" && !phone || !name || !product_name || !product_Id ){
        res.json({message: "Malumotlarni toliq kiriting"})
    }
    else {
        const order = await new OrderModel({
            product_Id, product_name , name, phone
        })
        await order.save()
            .then(() => {
                bot.sendMessage(process.env.CHAT_ID, `<b>Yangi buyurtma📦</b>\n📌 Buyurtma nomi: <b>${product_name}</b>\n👤 Buyurtmachi: ${name}\n☎️ Telefon raqami: <b>${phone}</b>`,{
                    parse_mode: 'HTML'
                })
                res.json(order)
            })
            .catch((e) => {
                console.log(e)
            })
    }


}

//Barcha malumotlarni olish
const getAllOrders = async (req, res) => {
    const order = await OrderModel.find()
        .then((order) => {
            res.json(order)
        })
        .catch((e) => {
            console.log(e)
        })
}

//Bitta malumot olish
const getOrder = async (req, res) => {
    const order = await OrderModel.findById(req.params.id)
        .then((order) => {
            res.json(order)
        })
        .catch((e) => {
            console.log(e)
        })
}

//Malumotlarni yangilash
const updateOrder = async (req, res) => {
    const { product_Id, product_name, name, phone } = req.body
    if(product_Id === "" || product_name === "" || name === "" || phone === "" && !phone || !name || !product_name || !product_Id ){
        res.json({message: "Malumotlarni toliq kiriting"})
    }
    else {
        const order = await OrderModel.findByIdAndUpdate(req.params.id, {
            product_Id, name, phone, product_name
        })
            .then((order) => {
                res.json(order)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

//Malumotni o'chirish

const deleteOrder = async (req, res) => {
    const order = await OrderModel.findByIdAndDelete(req.params.id)
        .then((order) => {
            res.json({message: "Malumot ochdi" , order})
        })
        .catch((e) => {
            console.log(e)
        })
}


module.exports = { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder }