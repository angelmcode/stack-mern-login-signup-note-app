const express = require("express");
const Notes = require("../models-db/notes-d.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
require("dotenv").config()

const routerNotes = express.Router();

// MiddleWare
routerNotes.use(express.json());
routerNotes.use(cookieParser());

// Get
routerNotes.get("/", (req, res) => {
    Notes.find().then((notes) => {
        res.send(JSON.stringify(notes));
    })
});

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

routerNotes.get("/informationusernotes", verify, (req, res) => {
        Notes.find().then((notes) => {
            const userNotes = notes.filter((notes) => notes.user === req.user)
            console.log(JSON.stringify(userNotes))
            res.cookie("hi cookie", "this is a cookie for notes")
            res.send(JSON.stringify(userNotes));
        }).catch(err => console.log(err))
});

routerNotes.get("/informationusernotes2", verify, (req, res) => {
    Notes.find().then((notes) => {
        const userNotes = notes.filter((notes) => notes.user === req.user)
        console.log(req.user)
        res.cookie("hi cookie", "this is a cookie for notes")
        res.send(JSON.stringify(userNotes));
    }).catch(err => console.log(err))
});

// Post
routerNotes.post("/notecreated", verify, (req, res) => {
    console.log(req.body)
    let note = req.body.note
    let user = req.user
    // let { user, note } = req.body;
    let newNote = new Notes({user, note})
    newNote.save().catch((err) => console.log(err));
    Notes.find().then((notes) => {
        const userNotes = notes.filter((notes) => notes.user === req.user)
        console.log(notes)
        res.send(JSON.stringify(userNotes));
    })
    console.log(newNote);
});

routerNotes.delete("/notedelete/:id", verify, async (req, res) => {
    console.log(req.params.id);
    await Notes.findByIdAndDelete(req.params.id).catch((err) => console.log(err));
    Notes.find().then((notes) => {
        const userNotes = notes.filter((notes) => notes.user === req.user)
        console.log(notes)
        res.send(JSON.stringify(userNotes));
    })
    // res.send({ update: "note delete" })
});

routerNotes.delete("/deleteAcountNotes", verify, async (req, res) => {
    try {
        await Notes.deleteMany( {user: req.body.user} ).catch((err) => console.log(err));
        res.send({ update: "deleted Acount Notes" })
    } catch {
        res.send({ update:"wrong details" })
    }
});

module.exports = routerNotes;