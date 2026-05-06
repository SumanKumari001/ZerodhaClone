const { OrdersModel } = require("../model/OrdersModel");
const wrapAsync = require("../utils/wrapAsync.js");
const { HoldingsModel } = require("../model/HoldingsModel");
// module.exports.getOrders = async(req,res) =>{
//     const allOrders = await Order.find({});
//     res.json(orders);
// } ---->wrong

module.exports.getOrders = async (req, res) => {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
};

module.exports.renderNewForm = (req,res)=>{
   res.json({ message: "Buy form route" }); 
}


module.exports.addNewOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // 🔹 Save order history (GOOD PRACTICE)
    await OrdersModel.create({ name, qty, price, mode });

    let existing = await HoldingsModel.findOne({ name });

    // ================= BUY =================
    if (mode === "BUY") {
      if (existing) {
        const totalQty = existing.qty + qty;

        const newAvg =
          (existing.qty * existing.avg + qty * price) / totalQty;

        existing.qty = totalQty;
        existing.avg = newAvg;
        existing.price = price;

        // simple calculation (you can improve later)
        existing.net = ((price - newAvg) * totalQty).toFixed(2);
        existing.day = "0.00"; // placeholder

        await existing.save();
      } else {
        await HoldingsModel.create({
          name,
          qty,
          avg: price,
          price: price,
          net: "0.00",
          day: "0.00",
        });
      }

      return res.json({ message: "BUY successful" });
    }

    // ================= SELL =================
    if (mode === "SELL") {
      if (!existing) {
        return res.status(400).json({
          error: "You don't own this stock",
        });
      }

      if (existing.qty < qty) {
        return res.status(400).json({
          error: "Not enough quantity",
        });
      }

      existing.qty -= qty;

      if (existing.qty === 0) {
        await HoldingsModel.deleteOne({ name });
      } else {
        existing.price = price;

        existing.net = ((price - existing.avg) * existing.qty).toFixed(2);
        existing.day = "0.00";

        await existing.save();
      }

      return res.json({ message: "SELL successful" });
    }

    res.status(400).json({ error: "Invalid mode" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};