const mongoose = require("mongoose");

const topSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    url: {
        type: String,
        require : true
    },
    imageUrl: {
        type: String,
        require : true
    },
    rank: {
        type: String
    },
    score: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const kmsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


let topList = mongoose.model("topListAnime", topSchema)
let kmsList = mongoose.model("kmsList", kmsSchema)


module.exports = { topList, kmsList}
