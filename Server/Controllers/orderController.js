const Inventory = require("../Models/inventorySchema");
const Purchase = require("../Models/purchaseOrderSchema");
const Sale = require("../Models/saleOrderSchema");
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const ApiFeature = require("../Utils/ApiFeature");
//create purchase and sale order, change their status

exports.createPurchaseOrder = asyncErrorHandler( async (req,res,next)=>{
    const {body} = req;
    const data = await Purchase.create(body);
    res.status(201).json({
        status:"Success",
        message:"Purchase order created successfully",
        data
    })
})
exports.createSaleOrder = asyncErrorHandler( async (req,res,next)=>{
    const {body} = req;
    
    const data = await Sale.create([body]);
    res.status(201).json({
        status:"Success",
        message:"Sale order created successfully",
        data
    })
})

exports.getPurchaseOrders = asyncErrorHandler(async (req,res,next)=>{

    const apiFeature = new ApiFeature(Purchase.find(),req.query);
    const data = await apiFeature.query;

    res.status(200).json({
        status:"Success",
        count:data.length,
        message:"Purchase Orders fetched successfully",
        data
    })
    
})
exports.getSaleOrders = asyncErrorHandler(async (req,res,next)=>{
    const apiFeature = new ApiFeature(Sale.find(),req.query);
    const data = await apiFeature.query;
    
    res.status(200).json({
        status:"Success",
        count:data.length,
        message:"Sale Orders fetched successfully",
        data
    })
    

})


exports.receivePurchaseOrder = asyncErrorHandler(async (req,res,next)=>{
    const {id} = req.params;
    const {payload} = req.body;
    const poDoc = await Purchase.findById(id);
    // console.log(poDoc.items);
    const itemsInOrder = [...poDoc.items];
    
    
    for(const item of payload){
        for(const orderItem of itemsInOrder){
            if(orderItem.sku==item.sku){
                if( item.quantityShipped > (orderItem.quantityOrdered - orderItem.quantityReceived)){
                    next(new Error("Shipped quantity exceeding order quantity"))
                }
                else{
                    poDoc.items[itemsInOrder.indexOf(orderItem)].quantityReceived += item.quantityShipped;
                   
                    let invId = await Inventory.find({sku:orderItem.sku})
                    invId[0].quantityAvailable += item.quantityShipped;
                 
                    
                    await Inventory.findByIdAndUpdate(invId[0]._id,invId[0],{new:true,runValidators:true})
                }
            }
        }

    }
    

    const data = await Purchase.findByIdAndUpdate(poDoc._id,poDoc,{new:true,runValidators:true});

    res.status(200).json({
        status:"Success",
        message:"Order Shipment updated",
        data
    })

})
exports.shipSaleOrder = asyncErrorHandler(async (req,res,next)=>{
    const {id} = req.params;
    const {payload} = req.body;
    const soDoc = await Sale.findById(id);
    // console.log(poDoc.items);
    const itemsInOrder = [...soDoc.items];
    
    
    for(const item of payload){
        for(const orderItem of itemsInOrder){
            if(orderItem.sku==item.sku){
                if( item.quantityShipped > (orderItem.quantityOrdered - orderItem.quantityShipped)){
                    next(new Error("Shipped quantity exceeding order quantity"))
                }
                else{
                    soDoc.items[itemsInOrder.indexOf(orderItem)].quantityShipped += item.quantityShipped;
                   
                    let invId = await Inventory.find({sku:orderItem.sku})
                    invId[0].quantityAvailable -= item.quantityShipped;

                    if(invId[0].quantityAvailable <0){
                        next(new Error("Insufficient stock"))

                    }
                 
                    
                    await Inventory.findByIdAndUpdate(invId[0]._id,invId[0],{new:true,runValidators:true})
                }
            }
        }

    }
    

    const data = await Sale.findByIdAndUpdate(soDoc._id,soDoc,{new:true,runValidators:true});

    res.status(200).json({
        status:"Success",
        message:"Order Shipment updated",
        data
    })

})