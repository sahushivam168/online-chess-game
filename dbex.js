var MongoClient=require('mongodb').MongoClient;  
var url="mongodb://localhost:27017/chessdb";  
var u="mack";
var e="sahurupalui@gmail.com";
var obj={ username: "mack",emailId: "mack1212@gmail.com"};
function userPromise()
{
return new Promise((resolve,reject)=>{
MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {  
var db=client.db('chessdb');
console.log(db);
if (err) reject(err);  
db.collection("UserDetails").find({username:u}).toArray(function(err, res) {  
if (err) reject(err);  
if(res.length==0)
{
resolve('No');
}
else
{
resolve('Yes');
}
});  
client.close();  
});  
});// promise end
}// userPromise end

function emailPromise()
{
return new Promise((resolve,reject)=>{
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {  
var db=client.db('chessdb');
if (err) reject(err);  
db.collection("UserDetails").find({emailId:e}).toArray(function(err, res) {  
if (err) reject(err);  
if(res.length==0)
{
resolve('No');
}
else
{
resolve('Yes');
}
});  
client.close();  
});  
});// promise end
}//emailPromise end


function insertPromise(obj)
{
return new Promise((resolve,reject)=>{
MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {  
var db=client.db('chessdb');
if (err) reject(err);  
db.collection("UserDetails").insertOne(obj,function(err,res){  
if (err) reject(err);  
});  
client.close();  
});  
});// promise end
}//insertPromise end

async function processing()
{
var userpromise=await userPromise();
var emailpromise;
var insertpromise;
if(userpromise=='No')
{
 emailpromise=await emailPromise();
 if(emailpromise=='No')
 {
   insertpromise=await insertPromise(obj);
 }
 else
 {
  console.log("Email exist");
 }
}
else
{
console.log("User exist");
}
}

processing();