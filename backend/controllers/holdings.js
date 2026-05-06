const { HoldingsModel } = require("../model/HoldingsModel");
const Order = require("../model/OrdersModel");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.index = async(req,res) =>{
    const allHolding = await HoldingsModel.find({});
     res.json(allHolding);  
}

