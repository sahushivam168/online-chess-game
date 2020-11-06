var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost:27017/chessdb";  
var u="mayankfasfa";
var e="mayanksahu@gmail.com";
var obj={username:"mayanksahu",emailId:"mayanksahu@gmail.com"};
async function dbProcessing()
{
try
{
const client=await MongoClient.connect(url, { useNewUrlParser: true });
var db=client.db('chessdb');
var user=await db.collection("UserDetails").find({username:u}).toArray();
if(user.length==0)
{
   var email=await db.collection("UserDetails").find({emailId:e}).toArray();
   if(email.length==0)
   {
      await db.collection("UserDetails").insertOne(obj);
      console.log("object inserted");
    }
    else
    {
      console.log("email exists");
    }
}
else
{
console.log("USer exists");
}
client.close();
}catch(err)
{
console.log(err);
}
}

dbProcessing();