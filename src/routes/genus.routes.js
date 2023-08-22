const {Router} = require("express")
const pool = require("../db")
const {getAllGenus, getGenusById, createGenus, deleteGenus, updateGenus} = require("../controllers/genus.controller")

const router = Router()

router.get("/genus", getAllGenus)
router.get("/genus/:id", getGenusById)
router.post("/genus/new", createGenus)
router.delete("/genus/:id", deleteGenus)
router.put("/genus/:id", updateGenus)

module.exports = router