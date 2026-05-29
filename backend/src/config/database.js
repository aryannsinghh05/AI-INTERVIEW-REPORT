const mongoose = require("mongoose");

async function DBConnection(){
    const uri = process.env.MONGO_URI;
    if(!uri){
        throw new Error("MONGO_URL is not defined in environment variables");
    }
    try{
        await mongoose.connect(uri);

        console.log("Database Connected Successfully");
    }
    catch(err){
        console.log(err);
    }
}
module.exports = DBConnection;