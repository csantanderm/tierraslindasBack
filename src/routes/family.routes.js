const {Router} = require("express")
const pool = require("../db")
const {getAllFamilies, getFamilyById, createFamily, deleteFamily, updateFamily} = require("../controllers/families.controller")

const router = Router()

router.get("/families", getAllFamilies)
router.get("/families/:id", getFamilyById)
router.post("/families/new", createFamily)
router.delete("/families/:id", deleteFamily)
router.put("/families/:id", updateFamily)

module.exports = router