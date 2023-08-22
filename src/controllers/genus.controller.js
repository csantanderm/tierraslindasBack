const pool = require("../db")

const getAllGenus = async (req,res)=>{
    try {
        const result = await pool.query(
            "SELECT * FROM genus"
        )
        return res.json(result.rows)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const getGenusById = async (req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        const result = await pool.query(
            "SELECT * FROM genus WHERE genus_id = $1",
            [id]
        )
        if (result.rowCount!=0){
            return res.json(result.rows[0])
        } else{
            return res.status(404).json({
                message: "Not found."
            })
        }
        
    } catch (error) {
        return res.json({error: error.message})
    }
}

const createGenus = async (req,res)=>{
    
    const objeto = JSON.parse(req.body.body)
    
    const family_id = objeto.family_id
    const name = objeto.name
    const description = objeto.description
    
    console.log(family_id, name, description)

    try {
        const result = await pool.query(
            "INSERT INTO genus (family_id,name,description) VALUES ($1,$2,$3) RETURNING *",
            [family_id,name,description]
        )
        return res.json(result.rows[0])
    } catch (error) {
        return res.json({error: error.message})
    } 
    
}
    

const deleteGenus = async (req,res)=>{
    console.log(req.params)
    const {id} = req.params
    
    try {
        const result = await pool.query(
            "DELETE FROM genus WHERE genus_id = $1",
            [id]
        )
    return res.json(result)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const updateGenus = async (req,res)=>{

    const objeto = JSON.parse(req.body.body)
    const id = objeto.genus_id

    const family_id = objeto.family_id
    const name = objeto.name
    const description = objeto.description
    

    console.log(family_id, name, description, id)
    
    try {
        const result = await pool.query(
            "UPDATE genus SET family_id = $1, name = $2, description = $3 WHERE genus_id = $4 RETURNING *",
            [family_id, name, description, id]
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
    getAllGenus,
    getGenusById,
    createGenus,
    deleteGenus,
    updateGenus
}