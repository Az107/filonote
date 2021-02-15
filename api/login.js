
const {MongoClient} = require("mongodb");
const md5 = require('md5');
const uri = "mongodb+srv://wpa:xJEbPEScFm298d2S@cluster0.6lw0m.mongodb.net/Filonote?retryWrites=true&w=majority"; // TODO: tokenize 
const client = MongoClient(uri);

function genToken(user){
    let token =  user.Name + "" + Math.trunc(Math.random() * 100) + Date.now();
    token = md5(token);
    return token;
}


exports.handler = async (req) => {
    let res = {
        statusCode: 401,
        body: "unautorized"
    }
    await client.connect();
    let database = client.db('Filonote');
    let users = database.collection('User');
    let args = JSON.parse(req.body);
    let user = await users.findOne({Name: args.user});

    if (user.Password == md5(args.pass)){
        let token = genToken(user);
        const result = await users.updateOne({Name: args.user}, {  $push: { "Tokens" : token }});
        res = {
            statusCode: 200,
            body: token
        }
    }
    return res;
        

  }