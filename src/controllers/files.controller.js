const fs = require('fs');

const getFile = (req, res)=>{
        
    const {id} = req.params
    const imagePath = __dirname+ "/public/imgUpload/"+id
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end('Imagen no encontrada');
        } else {
            // Configura los encabezados de la respuesta
            res.setHeader('Content-Type', 'image/jpeg'); // Cambia 'image/jpeg' al tipo adecuado si la imagen no es JPEG
            res.setHeader('Cache-Control', 'public, max-age=86400'); // Configura la caché según tus necesidades
    
            // Lee el archivo de la ubicación y envíalo como respuesta
            fs.createReadStream(imagePath).pipe(res);
        }
    });
    
}

const saveFile = (req, res)=>{

    const file = req.files.body
    const name = req.files.body.name

    const path = __dirname+"/public/imgUpload/" + name

    file.mv(path, (error)=>{
        if(error){
            console.log(error)
            res.writeHead(500,{
                "Content-type" : "application/json"
            })
            res.end(JSON.stringify({
                status: "error",
                message: error
            }))
            return
        }
        return res.status(200).send({
            status: "success",
            path: "public/imgUpload/"+name
        })
    })
}



module.exports = {
    getFile,
    saveFile
}