const pool = require("../db")

const getAllFamilies = async (req,res)=>{
    try {
        const result = await pool.query(
            "SELECT * FROM family"
        )
        return res.json(result.rows)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const getFamilyById = async (req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query(
            "SELECT * FROM family WHERE family_id = $1",
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

const createFamily = async (req,res)=>{
    
    const objeto = JSON.parse(req.body.body)
    
    const family_id = objeto.family_id
    const name = objeto.name
    const description = objeto.description
    
    try {
        const result = await pool.query(
            "INSERT INTO family (name,description) VALUES ($1,$2) RETURNING *",
            [name,description]
        )
        return res.json(result.rows[0])
    } catch (error) {
        return res.json({error: error.message})
    } 
    
}
    

const deleteFamily = async (req,res)=>{
    console.log(req.params)
    const {id} = req.params
    
    try {
        const result = await pool.query(
            "DELETE FROM family WHERE family_id = $1",
            [id]
        )
        return res.json(result)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const updateFamily = async (req,res)=>{

    const objeto = JSON.parse(req.body.body)
    const id = objeto.family_id
    const name = objeto.name
    const description = objeto.description
    
    try {
        const result = await pool.query(
            "UPDATE family SET name = $1, description = $2 WHERE family_id = $3 RETURNING *",
            [name, description, id]
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
    getAllFamilies,
    getFamilyById,
    createFamily,
    deleteFamily,
    updateFamily
}