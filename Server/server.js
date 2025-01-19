const dotenv = require("dotenv")
dotenv.config({
    path: "./config.env"
})
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.CONN_STR)
.then((conn)=>{
    console.log("Database Connection Successful")
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    console.log("Server is up and running")
})
