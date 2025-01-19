const mongoose = require("mongoose");
const validator = require("validator");
const Inventory = require("./inventorySchema");

const saleSchema = new mongoose.Schema({
    soNumber:{
        type:String,
        required:[true,"soNumber is a required field"],
        unique:true
    },
    customer:{
        type :{name:String, contact:String},
        validate:{
            validator: function(val){
                return validator.isEmail(val.contact)
            },
            message:"The given value does not seem to be an email"
        }
    },
    items:{
        type:[{
            sku:String, quantityOrdered:Number, quantityShipped:Number
            
        }],
        required:[true, "Items is a required field"]
    },
    status:{type:String,
        validate:{
            validator: function(val){
                let status = val.toLowerCase().trim()
                return status =="completed" || status =="cancelled" || status =="pending" 
            }
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now()
        
    },
    expectedShipmentDate:{
        type: Date,
        validate : {
            validator(v){
                return v>Date.now()
            },
            message:"Invalid Shipment Date"
        }
    },
    totalRevenue:{
        type:Number,
        required:[true, "Total Revenue is a required field"]
    }
})

saleSchema.pre('save',async function(next){

    
    const itemSkus = [...this.items]
    let status=true;
    let inavlidItems =""
    let invalidCompletion=""
    for(const v of itemSkus){
        try{

            const data = await Inventory.find({sku:v.sku})
            
            if(!data || data.length==0){
            status = false;
            inavlidItems+=v.sku
            
        }
        if((data.length>0 && this.status.toLowerCase().trim()=="completed"   ) ){
            console.log(v.quantityOrdered,v.quantityShipped);
            if(v.quantityShipped != v.quantityOrdered){
                status = false;
                invalidCompletion = "Certain items have not been shipped completely, hence the order can not be marked as completed"
            }
        }
        
        }catch(e){
            next(e)
        }
    }
    if(!status){
        // console.log(status);
        let message = inavlidItems.length>0 ? `The following SKUs do not exist in the inevntory list please add their information first: ${inavlidItems}` :" "
        const err = new Error(`${message} \n${invalidCompletion}`)
        next(err);
    }
    next()


})


saleSchema.post("findOneAndUpdate",async function(doc,next){

    // console.log("Post middleware called")

    let status= true;

    for(const item of doc.items){
        if(item.quantityOrdered > item.quantityShipped){
            status=false;
            break;
        }
    }

    if(status && doc.status!="completed"){
        
     
        
        await Sale.findByIdAndUpdate(doc._id, { status: "completed" })
    }

    next();

})


const Sale = mongoose.model('SaleOrder',saleSchema);

module.exports = Sale;

