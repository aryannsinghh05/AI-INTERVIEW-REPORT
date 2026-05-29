require ("dotenv").config();
const app  = require("./src/app");
const DBConnection = require("./src/config/database");

DBConnection();


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
