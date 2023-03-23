const fs=require("fs");
const path=require("path");
const uploadConfig=require("../configs/upload");


/* Quando a imagem chega no back, ela é carregada na pasta temporária, assim o back end pode decidir o que vai fazer com a imagem, porém, quando salva o
arquivo, precisa-se mover ela para pasta de upload, que é onde ela realmente vai ficar */
class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER,file),
            path.resolve(uploadConfig.UPLOADS_FOLDER,file)
        )
        return file;
    }


    async deleteFile(file){
        const filePath=path.resolve(uploadConfig.UPLOADS_FOLDER,file)

        try{
            await fs.promises.stat(filePath);
            // conferindo se existe o arquivo no path passado como parametro(retorna um boolean)
        }catch{
            return 
            // caso não tenha arquivo no diretório onde o upload realmente fica(UPLOAD_FOLDER), só retorna a função de delete e ela não acontece.
        }

        await fs.promises.unlink(filePath)
    }
}

module.exports=DiskStorage;