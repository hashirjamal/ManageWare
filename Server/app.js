const express = require("express");
const invRouter = require("./Routes/InventoryRoute")
const orderRouter = require("./Routes/orderRoute")

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Adjust the origin as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json())



app.use("/api/v1/inventory",invRouter);
app.use("/api/v1/order",orderRouter);


//keep this error middlerware in last
app.use((err,req,res,next)=>{
    console.log("Error occured in Controller",err);
    // console.log(err);
    res.status(400).json({
        status:"Failed",
        message:err.message
    })
})
module.exports = app;