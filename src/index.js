const express = require("express")
const morgan = require("morgan")
const cors = require("cors");
const fileUpload = require("express-fileupload") 

const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))

const familyRoutes = require("./routes/family.routes")
const genosRoutes = require("./routes/genus.routes")
const speciesRoutes = require("./routes/species.routes")
const stockRoutes = require("./routes/stock.routes")
const fileRoutes = require("./routes/file.routes")
const userRoutes = require("./routes/user.routes")


app.use(morgan("dev"))
app.use(express.json())
// sirve para que la consola pueda interpretar json

app.listen(4000)
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(familyRoutes, 
        genosRoutes, 
        speciesRoutes, 
        stockRoutes,
        fileRoutes,
        userRoutes)

console.log("Servidor montado en puerto 4000.")