const express = require("express");
const app = express();
const { mongoose } = require("./config-db.js")

// MiddleWare
app.use(express.json());

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["http://localhost:5173"]);
    res.append("Access-Control-Allow-Methods", ["GET,POST,PUT,PATCH,DELETE"]);
    res.append("Access-Control-Allow-Headers", ["*", "Content-Type", "user", "authorization"]);
    res.append("Access-Control-Allow-Credentials", true);
    next();
})

// Routers
const routerUsers = require("./routers/users.js");
app.use("/api/db-users/users", routerUsers);

const routerNotes = require("./routers/notes.js");
app.use("/api/db-users/notes", routerNotes);

app.get("/", (req, res) => {
    res.send("my server");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listened on Port: ${PORT}`);
});