const {Router} = require("express")
const pool = require("../db")
const {getFile, saveFile} = require("../controllers/files.controller")

const router = Router()

router.get("/image/:id", getFile)
router.post("/image", saveFile)


module.exports = router