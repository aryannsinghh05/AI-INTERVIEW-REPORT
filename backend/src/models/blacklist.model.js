const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const BlacklistedTokenSchema = mongoose.Schema({
    token:{
        type: String,
        required:[true , "token is req for blacklisting"]
    }
},{
    Timestamp: true
})

const BlacklistedTokenModel = mongoose.model("BlacklistedTokens" , BlacklistedTokenSchema);

module.exports = BlacklistedTokenModel;