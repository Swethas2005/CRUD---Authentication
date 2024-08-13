const mongoose = require("mongoose");
let URL = "mongodb://127.0.0.1:27017/Movies"
let connection = mongoose.connect(URL);

module.exports = connection