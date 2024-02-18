const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/db-users";

mongoose.connect(URI)
    .then(db => console.log("Data Base is Connected"))
    .catch(err => console.log("Fail: " + err))

module.exports = mongoose;