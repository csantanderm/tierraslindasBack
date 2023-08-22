const {Router} = require("express")
const pool = require("../db")
const {getAllSpecies, getSpeciesById, deleteSpecies, updateSpecies, createSpecies, getVisibleSpecies} = require("../controllers/species.controller")

const router = Router()

router.get("/species", getAllSpecies)
router.get("/species/visible", getVisibleSpecies)
router.get("/species/:id", getSpeciesById)
router.post("/species/new", createSpecies)
router.delete("/species/:id", deleteSpecies)
router.put("/species/:id", updateSpecies)

module.exports = router