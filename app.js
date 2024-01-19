const express = require("express")
const mongoose = require("mongoose");
const cors = require('cors')
const app = express()
const PORT = 7000
const router = require('./router/catalogRouter')
const path = require('path')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./bot/bot')



app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
app.use(session({
    secret: 'voyoo2017',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 3600000}
}))
app.use(cookieParser())



app.use('/api/catalog', router )
app.use('/api/zayavka', require('./router/ZayavkaRouter') )
app.use('/api/material', require("./router/materialRouter"))
app.use('/api/product', require("./router/productRouter"))
app.use('/api/order', require("./router/orderRouter"))
app.use('/api/promotion', require("./router/promotionRouter"))
app.use('/api/promotion_date', require("./router/promotion_date._router"))
app.use('/admin', require("./router/login"))
const db = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/hadidmebel_mern")
            .then(() => {
                console.log("Malumotlar bazasi ishlavotti")
            })
            .catch((error) => {
                console.log(error)
            })
    }catch(error){
        console.log(error)
    }
}
db()
app.listen(PORT, () => {
    console.log(`Server ishlavotti : ${PORT}`)
})

