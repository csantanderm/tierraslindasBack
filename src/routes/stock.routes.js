const {Router} = require("express")
const pool = require("../db")
const {getAllStocksById, deleteStock, updateStock, createStock} = require("../controllers/stocks.controller")

const router = Router()

router.get("/stocks/:id", getAllStocksById)
router.post("/stocks/new", createStock)
router.delete("/stocks/:id", deleteStock)
router.put("/stocks/:id", updateStock)

module.exports = router