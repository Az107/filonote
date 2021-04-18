const {MongoClient} = require("mongodb");
const uri = process.env.MONGOURI; 

async function  checkDBConnection(){
    try{
        let client = MongoClient(uri);
        await client.connect()
        let database = client.db('Filonote');
        return true;
    }catch (error){
        console.error(error);
        return false;
    }
}

exports.handler = async (event) => {
    let body =  "api working ✅"
    body += "\n" + ( await checkDBConnection() ? "DB working ✅" : "DB failed ❌");

    return {
        headers:{
            "Content-Type": "text/html; charset=utf-8"
        },

        statusCode: 200,
        body: body
        }
  }