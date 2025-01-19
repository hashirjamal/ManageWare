const express = require("express");
const { addItems, getItems, updateItem, getOneItem, deleteOneItem, getStats, getLowStock } = require("../Controllers/inventoryController");


const router = express.Router()

router.route("/items").post(addItems).get(getItems)
router.route("/items/:id").patch(updateItem).get(getOneItem).delete(deleteOneItem);
router.route("/items-stats").get(getStats);
router.route("/low-stock").get(getLowStock);

module.exports = router