const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "alester00",
    host: "localhost",
    port: 5432,
    database: "plantsdb"
})

module.exports = pool