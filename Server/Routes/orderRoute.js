const express = require("express");
const { createPurchaseOrder, createSaleOrder, receivePurchaseOrder, getPurchaseOrders, getSaleOrders, shipSaleOrder } = require("../Controllers/orderController");


const router = express.Router()

router.route("/po").post(createPurchaseOrder).get(getPurchaseOrders);
router.route("/so").post(createSaleOrder).get(getSaleOrders);
router.route("/receivePO/:id").post(receivePurchaseOrder)
router.route("/shipSO/:id").post(shipSaleOrder)


module.exports = router