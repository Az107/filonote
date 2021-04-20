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
    let notes = await database.collection("Notes");
    let tokens = await database.collection('Tokens');

    let args = JSON.parse(req.body);
    let Token = await tokens.findOne({token: args.Token});
    console.log(args.Token);
    args.Notes.forEach(note => {
        notes.updateOne({userId: Token.userId},{$push: {Notes: note}});
    });


    return res;

    
    

}