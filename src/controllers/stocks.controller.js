const pool = require("../db")


const getAllStocksById = async (req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        const result = await pool.query(
            "SELECT * FROM stock WHERE species_id = $1",
            [id]
        )
        if (result.rowCount!=0){
            return res.json(result.rows)
        } else{
            return res.status(404).json({
                message: "Not found."
            })
        }
        
    } catch (error) {
        return res.json({error: error.message})
    }
}

const createStock = async (req,res)=>{
    
    const objeto = JSON.parse(req.body.body)
    
    const size = objeto.size
    const price = objeto.price
    const amount = objeto.amount
    const species_id = objeto.species_id
    
    
    console.log(size, price, amount, species_id)

    try {
        const result = await pool.query(
            "INSERT INTO stock (size,price,amount,species_id) VALUES ($1,$2,$3,$4) RETURNING *",
            [size,price,amount,species_id]
        )
        return res.json(result.rows[0])
    } catch (error) {
        return res.json({error: error.message})
    } 
    
}
    

const deleteStock = async (req,res)=>{
    const id = req.params.id
    console.log(id)
    try {
        const result = await pool.query(
            "DELETE FROM stock WHERE stock_id = $1",
            [id]
        )
    return res.json(result)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const updateStock = async (req,res)=>{
    const objeto = JSON.parse(req.body.body)
    
    const stock_id = objeto.stock_id
    const size = objeto.size
    const price = objeto.price
    const amount = objeto.amount
    const species_id = objeto.species_id

    try {
        const result = await pool.query(
            "UPDATE stock SET size = $1, price = $2, amount = $3, species_id = $4  WHERE stock_id = $5 RETURNING *",
            [size, price, amount, species_id, stock_id]
        )
        if (result.rowCount!=0){
            return res.json(result.rows[0])
        } else {
            return res.status(404).json({
                message: "Not found."
            })
        }
        
    } catch (error) {
        return res.json({error: error.message})
    }
}

module.exports = {
    getAllStocksById,
    createStock,
    deleteStock,
    updateStock
}