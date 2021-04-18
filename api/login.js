const {MongoClient, ObjectID} = require("mongodb");
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
    let res = {
        statusCode: 401,
        body: "unautorized"
    }

    await client.connect();
    let database = client.db('Filonote');
    let users = database.collection('User');
    let tokens = database.collection("Tokens");
    let args = JSON.parse(req.body);
    let user = await users.findOne({Name: args.user});

    if (user.Password == md5(args.pass)){
        let token = genToken(user);
        await tokens.insertOne(token);
        res = {
            statusCode: 200,
            body: token.token
        }
    }
    return res;
        

  }
