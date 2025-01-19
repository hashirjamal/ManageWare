
const mongoose = require("mongoose");
const validator = require("validator")

const invSchema = new mongoose.Schema(
  {  sku:{
        type:String,
        unique:true,
        required:[true, "SKU is a required field"]
    },
    name:{
        type:String,
        required:[true, "Name is a required field"]
    },
    description :{
        type: String,
        required:[true, "Description is a required field"]
    },
    category :{
        type: String,
        required:[true, "Category is a required field"]
    },
    quantityAvailable:{
        type: Number,
        required:[true, "Quantity is a required field"]
    },
    minThreshold:{
        type: Number,
        required:[true, "Minthreshold is a required field"]
    },
    unitCost:{
        type: Number,
        required:[true, "Unit Cost is a required field"]
    },
    location:{
        type: {warehouse:String, aisle:String, shelf:String}
    },
    supplier:{
        type:{name:String, contact:String},
        validate: {
            validator : function(val){
                return validator.isEmail(val.contact)
            },
            message:"Invalid email format"
        }
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    }
    
}


)
const Inventory = mongoose.model("Inventory",invSchema);

module.exports = Inventory;