const {MongoClient, ObjectID} = require("mongodb");
const uri = process.env.MONGOURI;
const client = MongoClient(uri);



exports.handler = async (req) => {
    let res = {
        statusCode: 200,
        body: ""
    }

    await client.connect();
    let database = await client.db('Filonote');
    let tokens = await database.collection('Tokens');
    let notes = await database.collection("Notes");
    var args = JSON.parse(req.body);
    let Token = await tokens.findOne({token: args.Token});
    let retrivedNotes = await notes.findOne({userId: Token.userId});
    res.body = JSON.stringify(retrivedNotes);
    return res;
        

  }
