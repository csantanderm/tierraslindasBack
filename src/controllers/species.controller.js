const pool = require("../db")

const getAllSpecies = async (req,res)=>{
    try {
        const result = await pool.query(
            "SELECT * FROM species"
        )
        return res.json(result.rows)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const getVisibleSpecies = async (req,res)=>{
    try {
        const result = await pool.query(
            "SELECT * FROM species WHERE publish = true"
        )
        return res.json(result.rows)
    } catch (error) {
        return res.json({error: error.message})
    }
}


const getSpeciesById = async (req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query(
            "SELECT * FROM species WHERE species_id = $1",
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

const createSpecies = async (req,res)=>{
    
    const objeto = JSON.parse(req.body.body)
    
    const cientificname = objeto.cientificname
    const name = objeto.name
    const genus_id = objeto.genus_id
    const description = objeto.description
    const irrigation = objeto.irrigation
    const publish = objeto.publish
    const img = objeto.img
    
    try {
        const result = await pool.query(
            "INSERT INTO species (cientificname,name,description,irrigation,genus_id,publish,img) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [cientificname,name,description,irrigation,genus_id,publish,img]
        )
        return res.json(result.rows[0])
    } catch (error) {
        return res.json({error: error.message})
    } 
    
}
    

const deleteSpecies = async (req,res)=>{
    const id = req.params.id
    console.log(id)
    try {
        const result = await pool.query(
            "DELETE FROM species WHERE species_id = $1",
            [id]
        )
    return res.json(result)
    } catch (error) {
        return res.json({error: error.message})
    }
}

const updateSpecies = async (req,res)=>{
    const objeto = JSON.parse(req.body.body)
    
    const species_id = objeto.species_id
    const cientificname = objeto.cientificname
    const name = objeto.name
    const genus_id = objeto.genus_id
    const description = objeto.description
    const irrigation = objeto.irrigation
    const publish = objeto.publish
    const img = objeto.img

    try {
        const result = await pool.query(
            "UPDATE species SET cientificname = $1, name = $2, genus_id = $3, description = $4, irrigation = $5, publish = $6, img = $7 WHERE species_id = $8 RETURNING *",
            [cientificname, name, genus_id, description, irrigation, publish, img, species_id]
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
    getAllSpecies,
    getVisibleSpecies,
    getSpeciesById,
    createSpecies,
    deleteSpecies,
    updateSpecies
}