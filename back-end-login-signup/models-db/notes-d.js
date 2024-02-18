const mongoose = require("mongoose");

const { Schema } = mongoose;

const notesSchema = new Schema({
    user: { type: String, required: true },
    note: { type: String, required: true },
});

module.exports = mongoose.model("Notes", notesSchema);