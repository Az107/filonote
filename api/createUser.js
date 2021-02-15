const {MongoClient} = require("mongodb");
const md5 = require('md5');
const uri = process.env.MONGOURI; // TODO: tokenize 
const client = MongoClient(uri);

function genToken(user){
    let token =  user.Name + "" + Math.trunc(Math.random() * 100) + Date.now();
    token = md5(token);
    return token;
}


exports.handler = async (req) => {
    await client.connect();
    let database = client.db('Filonote');
    let users = database.collection('User');
    let notes = database.collection('Notes');
    let args = JSON.parse(req.body);
    let user = {
        Name: args.user,
        Password: md5(args.pass),
        Tokens: []
    }
    let unotes = {
        userName: args.user,
        Notes = []
    }
    
    let token = genToken(user);
    user.Tokens.push(token);
    await users.insertOne(user);
    await notes.insertOne(unotes);


    return {
        statusCode: 200,
        body: token
    }
    

  }