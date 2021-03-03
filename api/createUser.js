const {MongoClient} = require("mongodb");
const md5 = require('md5');
const uri = process.env.MONGOURI; 
const client = MongoClient(uri);

function genToken(user){
    let token =  user.Name + "" + Math.trunc(Math.random() * 100) + Date.now();
    token = md5(token);
    let d = new Date();
    var tokenObject = {
        userId: user._id,
        token: token,
        createdAt: d,
        expireAt: new Date(d.getFullYear(),(d.getMonth() + 1),d.getDate())
    }
    return tokenObject;
}


exports.handler = async (req) => {
    await client.connect();
    let database = client.db('Filonote');
    let users = database.collection('User');
    let notes = database.collection('Notes');
    let tokens = database.collection("Tokens");
    let args = JSON.parse(req.body);
    let user = {
        Name: args.user,
        Password: md5(args.pass)
    }
    let unotes = {
        userName: args.user,
        Notes = []
    }
    
    let token = genToken(user);
    await users.insertOne(user);
    await notes.insertOne(unotes);
    await tokens.insertOne(token);


    return {
        statusCode: 200,
        body: token
    }
    

  }