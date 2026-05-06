const express = require("express");
const router = express.Router();
const { OrdersModel } = require("../model/OrdersModel");
const wrapAsync = require("../utils/wrapAsync.js");

const orderController = require("../controllers/order.js");


router.route("/")
.get(wrapAsync(orderController.getOrders))

router.route("/newOrder")
.get(orderController.renderNewForm)
.post(wrapAsync(orderController.addNewOrder));

module.exports = router;