const express = require("express");
const Users = require("../models-db/users-d.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const cookieParser = require("cookie-parser")

const routerUsers = express.Router();

// MiddleWare
routerUsers.use(express.json());
routerUsers.use(cookieParser());

// routerUsers.get("/informationuser", (req, res) => {
//     Users.find().then((users) => {
//         const userNotes = users.filter((register) => register.user === req.headers.user)
//         console.log(userNotes)
//         res.send(JSON.stringify(userNotes));
//     }).catch(err => console.log(err))
// });

//Verify
const verify = (req, res, next) => {
    let token = req.cookies.acces_token
    if (token) {
        console.log(token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({data: "token is not valid"})
            }
            req.user = data.user
            next()
        })
    } else {
        res.status(401).json({data: "no authenticated"})
    }
}

async function hashPassWord (password) {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt)
    return hashPass
}

async function comparePassWord (userpassword, hashPassWord) {
    const comparePass = await bcrypt.compare(userpassword, hashPassWord)
    return comparePass
}

// Post 2
routerUsers.post("/signup", async (req, res) => {
    try {
        const check = await Users.findOne({user: req.body.user})
        if (check) {
            res.send("user alrady exist")
        } else {
            const data = {
                email: req.body.email,
                user: req.body.user,
                password: await hashPassWord(req.body.password),
                refresh_token: "refresh_token"
            }
            const dataMany = await Users.insertMany([data])
            res.send({hi: "user created", user: req.body.user, data: dataMany[0]._id})
            // res.setHeader("set-cookie", "foo=bar")
            // res.send({ hi: "hi" })
        }
    } catch {
        res.send("wrong details")
    }
});

routerUsers.post("/validemail", async (req, res) => {
    try {
        const check = await Users.findOne({email: req.body.email})
        if (check) {
            res.send({update: "email alrady registered"})
        } else {
            res.send({update: "valid email"})
        }
    } catch {
        res.send("wrong details")
    }
});

routerUsers.post("/validuser", async (req, res) => {
    try {
        const check = await Users.findOne({user: req.body.user})
        if (check) {
            res.send({update: "user alrady exist"})
        } else {
            res.send({update: "valid username"})
        }
    } catch {
        res.send("wrong details")
    }
});

// Post 3
routerUsers.post("/login", async (req, res) => {
    try {
        const check = await Users.findOne({email: req.body.email})
        const passCheck = await comparePassWord(req.body.password, check.password)
        if (check && passCheck) {
            const token = genereAccesToken({user: check.user, userId: check._id})
            const refreshtoken = genereRefreshToken({user: check.user, userId: check._id})
            // const refresh_token = "genereRefreshToken({user: req.body.user})"
            // const refresh_token = refreshtoken;
            // let user = "e";
            // let password;
            
            res.cookie("acces_token",token, { httpOnly: true })
            res.cookie("refresh_token",refreshtoken, { httpOnly: true })
            res.cookie("logingin","true",{ expires: new Date(Date.now() + 60 * 1000) })
            res.send({ update: "user match", token: token, user: check.user, data: check._id})
        } else {
            res.send({ update:"email or password is incorrect" })
        }
    } catch {
        res.send({ update:"wrong details" })
    }
});

const genereAccesToken = (user) => {
    const atoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
    return atoken;
}

const genereRefreshToken = (user) => {
    console.log("user.userId: " + user.userId)
    const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1m"})
    // const refresh_token = rtoken;
    Users.findByIdAndUpdate(user.userId, { refresh_token }).catch((err) => console.log(err));
    return refresh_token;
}

routerUsers.get("/getinfouser", verify, (req, res) => {
    Users.find().then((users) => {
        const userInfo = users.filter((users) => users.user === req.user)
        console.log(JSON.stringify(userInfo[0].user))
        res.cookie("info cookie", "this is a cookie for user information")
        res.send(JSON.stringify({ user: userInfo[0].user }));
    }).catch(err => console.log(err))
});

routerUsers.get("/refreshtoken", async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    console.log("refreshToken: " + refreshToken)
    if (refreshToken == null) return res.status(401).json({unauthorizeth:"unauthorizeth"})
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json({data: "unauthenticated"})
        const userDb = await Users.findById(userInfo.userId).catch((err) => console.log(err));
        console.log("userDb.refresh_token: " + userDb.refresh_token)
        if (userDb.refresh_token != refreshToken) return res.status(403).json({data: "no authenticated 2"})
        const token = genereAccesToken({user: userInfo.user, userId: userInfo.userId})
        const refreshtoken = genereRefreshToken({user: userInfo.user, userId: userInfo.userId})
        console.log(userInfo)
        res.cookie("acces_token", token, { httpOnly: true })
        res.cookie("refresh_token",refreshtoken, { httpOnly: true })
        res.cookie("logingin","true",{ expires: new Date(Date.now() + 60 * 1000) })
        res.send({data: refreshToken, user: userInfo.user, userId: userInfo.userId, dataToken: "refreshed"})
    }).catch((err) => console.log(err));
});

routerUsers.patch("/updatePassword", async (req, res) => {
        console.log(req.body.formerPassword);
        console.log(req.body.newPassword);
        try {
            const check = await Users.findOne({user: req.body.user})
            const passCheck = await comparePassWord(req.body.formerPassword, check.password)
            if (check && passCheck) {
                const newPassword = await hashPassWord(req.body.newPassword)
                Users.findByIdAndUpdate(check._id, { password: newPassword }).catch((err) => console.log(err));
                res.send({update: "password updated"})
            } else {
                res.send({ update:"user or password is incorrect" })
            }
        } catch {
            res.send({ update:"wrong details" })
        }
});

routerUsers.delete("/deleteAcount", verify, async (req, res) => {
    try {
        const check = await Users.findOne({user: req.body.user})
        const passCheck = await comparePassWord(req.body.password, check.password)
        if (check && passCheck) {
            await Users.findByIdAndDelete(check._id).catch((err) => console.log(err));
            res.send({ update: "deleted Acount" })
        } else {
            res.send({ update:"user or password is incorrect" })
        }
    } catch {
        res.send({ update:"wrong details" })
    }
});

routerUsers.delete("/logout", verify, (req, res) => {
    res.clearCookie("acces_token")
    res.clearCookie("refresh_token")
    res.clearCookie("logingin")
    res.send({ update: "logout" })
});

// // Delete
// routerUsers.delete("/delete", async (req, res) => {
//     console.log(req.params.id);
//     await Users.findByIdAndDelete(req.params.id).catch((err) => console.log(err));
//     Users.find().then((users) => {
//         res.send(JSON.stringify(users));
//     })
// });

module.exports = routerUsers;