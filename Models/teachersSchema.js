const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    _id: Number,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: String
})

module.exports = mongoose.model("teachers", schema);