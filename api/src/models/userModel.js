const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    createTime:{type:Date, default:Date.now},
    status:{type:String, enum:["Trail", "Paid", "Inactive"], default:"Trail"},
});

module.exports = mongoose.model("User", userSchema);
