const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const session = require('express-session')
const {decode} = require("jsonwebtoken");
const {connect} = require("mongoose");

const adminCredentials = [
    {
        login: "admin",
        password: "admin"
    }
]

const secretKey = 'secretKey';
const generateToken = (user) => {
    return jwt.sign({ login: adminCredentials.login }, secretKey, { expiresIn: '1h' });
};



const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.session.token;
    if (!token) {
        return res.status(403).json({ success: false, message: 'Token yo\'q' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token noto\'g\'ri' });
        }
        req.user = decoded;
        next();
    });
};


const login = (req, res) => {
    const { login, password } = req.body;
    const user = adminCredentials.find(u => u.login === login && u.password === password);

    if (user) {
        const token = generateToken(user);
        req.session.token = token;
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 }); // 1 soat
        res.json({ success: true, message: 'Login muvaffaqiyatli', token });
    } else {
        res.status(401).json({ success: false, message: 'Login yaroqsiz' });
    }
}



const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('token');
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Chiqish muvaffaqiyatli' });
}


const admin =  (req, res) => {
    if (req.body.login === 'hadidmebel') {
        res.json({ success: true, message: 'Xush kelibsiz, admin' });
    } else {
        res.status(403).json({ success: false, message: 'Siz admin emassiz' });
    }
}



// const login = async (req, res) => {
//     const {login, password} = req.body
//     const user = adminCredentials.find(u => u.login === login && u.password === password)
//     if (user) {
//         const token = jwt.sign({login}, 'voyoo2017', {expiresIn: '1h'})
//         req.session.token = token
//         res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});//1 Soat
//         res.json({success: true, message: 'Login muvaffaqiyatli amalga oshirildi'})
//     }
//     else {
//         res.status(401).json({success: false, message: "Login yaroqsiz"})
//     }
// }

// const logout = async (req, res) => {
//     req.session.destroy()
//     res.clearCookie('token')
//     res.clearCookie('connect.sid')
//     await res.json({success: true, message: 'Chiqish muvaffaqiyatli'})
// }
//
//
// const protectded = async (req, res) => {
//     await res.json({ success: true, message: 'Xush kelibsiz, admin!' })
// }
//
//
module.exports = {admin, logout, login, verifyToken}
//
