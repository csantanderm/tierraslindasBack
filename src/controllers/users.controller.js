const pool = require("../db")

const getUserByName = async (req,res)=>{
    
    const user  = req.params.user
    const pass = req.params.pass
    
    try {
        const result = await pool.query(
            "SELECT * FROM usuario WHERE name = $1",
            [user]
        )
        console.log(result.rowCount)
        if (result.rowCount!=0){
            if (result.rows[0].password == pass){
                return res.json(result.rows[0])
            } else{
                return res.status(404).json({
                    message:"Password"
                })
            }
            
            
        } else{
            console.log("NOHAY")
            return res.status(404).json({
                message: "User"
            })
        }
        
    } catch (error) {
        console.log("error")
        return res.json({error: error.message})
    }
}

module.exports = {
    getUserByName,
}