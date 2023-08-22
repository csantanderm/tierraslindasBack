const {Router} = require("express")
const pool = require("../db")
const {getUserByName} = require("../controllers/users.controller")

const router = Router()

router.get("/user/:user/:pass", getUserByName)


module.exports = router