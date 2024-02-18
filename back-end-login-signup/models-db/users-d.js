const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const { Schema } = mongoose;

const usersSchema = new Schema({
    email: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
    refresh_token: { type: String, required: true }
});

usersSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("Users", usersSchema);