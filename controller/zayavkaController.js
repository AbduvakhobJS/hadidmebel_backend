const { bot } = require('../bot/bot')
const ZayavkaModel = require('../model/zayavkaModel')


//Malumot yaratish
const createZayavka = async (req, res) => {
    const { name, phone } = req.body
    if(name === "" || phone === "" && !name || !phone){
        res.json({message: "Malumotni to'liq kiriting"})
    }
    else {
        const catalog = await new ZayavkaModel({
            name,
            phone
        })
        await catalog.save()
            .then(() => {
                res.json(catalog)
                bot.sendMessage(process.env.CHAT_ID, `<b>Sizga yangi sorov yuborishdi 📩</b>\n👤 Ismi: <b>${name}</b>\n☎️ Raqami: <b>${phone}</b>`,{
                    parse_mode: "HTML"
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }


}

//Barcha malumotlarni olish
const getAllZayavkas = async (req, res) => {
    const catalogs = await ZayavkaModel.find()
        .then((catalogs) => {
            res.json(catalogs)
        })
        .catch((e) => {
            console.log(e)
        })
}

//Bitta malumot olish
const getZayavka = async (req, res) => {
    const catalog = await ZayavkaModel.findById(req.params.id)
        .then((catalog) => {
            res.json(catalog)
        })
        .catch((e) => {
            console.log(e)
        })
}

//Malumotlarni yangilash
const updateZayavka = async (req, res) => {
    const { name, surename, phone } = req.body
    if(name === "" || surename === "" || phone === "" && !name || !surename || !phone){
        res.json({message: "Malumotni to'liq kiriting"})
    }
    else {
        const catalog = await ZayavkaModel.findByIdAndUpdate(req.params.id, {
            name, surename, phone
        })
            .then((catalog) => {
                res.json(catalog)
            })
            .catch((e) => {
                console.log(e)
            })
    }

}

//Malumotni o'chirish
const deleteZayavka = async (req, res) => {
    const catalog = await ZayavkaModel.findByIdAndDelete(req.params.id)
        .then((catalog) => {
            res.json({message: "Malumot ochdi"})
        })
        .catch((e) => {
            console.log(e)
        })
}


module.exports = { createZayavka, getAllZayavkas, getZayavka, updateZayavka, deleteZayavka }