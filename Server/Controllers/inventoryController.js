const Inventory = require("../Models/inventorySchema");
const ApiFeature = require("../Utils/ApiFeature");
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");


exports.addItems = asyncErrorHandler(async (req, res, next) =>{
    const {payload} = req.body;

    const data= await Inventory.insertMany(payload);
    res.status(201).json({
        status:"Success",
        message:"Items added successfully",
        data
    })


})


exports.getItems = asyncErrorHandler(async (req,res,next)=>{

    const apiFeature = new ApiFeature(Inventory.find(),req.query).filter().sort().paginate().limit();

    const data = await apiFeature.query;
    res.status(200).json(
        {
            status:"Success",
            message:"Items fetched successfully",
            count:data.length,
            data
        }
    )
})

exports.getOneItem = asyncErrorHandler(async (req,res,next)=>{
    const {id} = req.params;

    const data = await Inventory.findById(id);

    const flag = Boolean(data)
if(flag){

    res.status(200).json({
        status:"Success",
        message:`Item fetched successfully`,
        data
    })
}
else{
    res.status(404).json({
        status:"Not Found",
        message:`Item not found`,
        data
    })
    
}
})
exports.deleteOneItem = asyncErrorHandler(async (req,res,next)=>{
    const {id} = req.params;

    const data = await Inventory.findByIdAndDelete(id);

    res.status(200).json({
        status:"Success",
        message:"Item Deleted successfully",
        data
    })
})



exports.updateItem = asyncErrorHandler(async (req,res,next)=>{
    const {id} = req.params;

    const data = await Inventory.findByIdAndUpdate(id,req.body,{new:true, runValidators:true});

    res.status(200).json({
        status:"Success",
        message:"Item updated successfully",
        data
    })

})

exports.getStats = asyncErrorHandler(async (req,res, next)=>{
    // show how many skus and how many quantiy are there in total
    // average unit cost
    
    const data = await Inventory.aggregate([
        
        {
            $group:{
                _id:null,
                totalSKU: {$sum:1},
                totalQuantity : {$sum : '$quantityAvailable'},
                avgPrice : {$avg:'$unitCost'}
            }
        },
        {$project:{_id:0}}
    ])

    res.status(200).json({
        status:"Success",
        message:"Inventory Data fetched",
        data
    })
})

exports.getLowStock = asyncErrorHandler(async (req,res,next)=>{
    // how many skus have a low stock
    // list all those skus who have low stock

    const data = await Inventory.aggregate([
        { $match: {
            $expr: {
                $lte: ["$quantityAvailable", "$minThreshold"]
            }
        }},
        {$project : { _id:0, description:0,location:0, supplier:0 }},
        {$sort : { quantityAvailable:1 }}
    ])

    let sum =0;
    data.forEach((v,i)=>{
        sum+=(v.minThreshold-v.quantityAvailable)
    })
let avg = sum / data.length;
    // data.count = 

    res.status(200).json({
        status:"Success",
        message:"SKUs with low stock",
        SKUcount : data.length,
        avgStockDifference : avg,
        data
    })

})