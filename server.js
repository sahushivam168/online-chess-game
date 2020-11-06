var express=require("express");
var MongoClient=require('mongodb').MongoClient;  
var url="mongodb://localhost:27017/chessdb";  
var socket=require("socket.io");
var app=express();
var server=app.listen(8086,fun);
var connections=[];
var allConnectedId=[];
function fun()
{
var port=server.address().port;
console.log("Listening on port :"+port);
}

app.use(express.static('public'));
app.get('/',function (request,response)
{
response.sendFile(__dirname+"\\public\\main.html");
});


var io=socket(server);

io.on('connection',function(socket){
console.log("User is connected with Id : "+socket.id);

socket.on('myclick',function(data)
{
socket.broadcast.to(data.id).emit('myclick',{
x:data.x,
y:data.y,
id:socket.id
});
});

socket.on('fetch',function(message){
if((message.msg).match("fetch"))
{
socket.emit('fetch',{
Connections : connections,
AllConnectedId : allConnectedId
});
}
});

socket.on('userdbconnection',async function(userData){
var res=await dbProcessing(userData);
socket.emit('userdbconnection',{
Connections : connections,
AllConnectedId : allConnectedId,
dbResponse :res
});
});


socket.on('logindbconnection',async function(userData){
var res;
try
{
var client=await MongoClient.connect(url,{useNewUrlParser:true});
var db=client.db('chessdb');
var user=await db.collection('UserDetails').find({Username:userData.Username}).toArray();
if(user.length!=0)
{
   var password=await db.collection('UserDetails').find({Username:userData.Username,Password:userData.Password}).toArray();
   if(password.length!=0)
   {
     console.log("User login");
     res=3;
     connections.push([socket.id,userData.Username]);
    }
   else
   {
    console.log("Password doesn't match");
    res=2;
    }
}
else
{
console.log("User not exist");
res=1;
}
client.close();
}catch(err)
{
console.log(err);
}
socket.emit('logindbconnection',{
Connections : connections,
AllConnectedId : allConnectedId,
dbResponse :res
});
});

socket.on('resetdbconnection',async function(userData){
var res;
try
{
var client=await MongoClient.connect(url,{useNewUrlParser:true});
var db=client.db('chessdb');
var email=await db.collection('UserDetails').find({Email:userData.Email}).toArray();
if(email.length!=0)
{
 await db.collection('UserDetails').updateOne({Email:userData.Email},{$set:{Password:userData.Password}});
 console.log("password updated");
 res=2;
}
else
{
console.log("Email doesn't exists");
res=1;
}
client.close();
}catch(err)
{
console.log(err);
}
socket.emit('resetdbconnection',{
dbResponse :res
});
});



socket.on('link',function(message){
if((message.msg).match("link"))
{
socket.emit('link',{
Connections : connections,
AllConnectedId : allConnectedId
});
}
});

socket.on('connectto',function(data)
{
socket.broadcast.to(data.id).emit('request',{
msg:'request',
id:socket.id,
user:data.user
});
});


socket.on('connectedto',function(data)
{
if((data.msg).match("accept")) allConnectedId.push([data.id,socket.id]);
socket.broadcast.to(data.id).emit('response',{
msg:data.msg,
res_id:socket.id
});
});


socket.on('disconnect',function()
{
for(var i=0;i<connections.length;i++)
{
if(connections[i][0].match(socket.id))
{
connections.splice(i,1);
break;
}
}

for(var i=0;i<allConnectedId.length;i++)
{
var found=false;
var disconnectId;
if(allConnectedId[i][0].match(socket.id))
{
found=true;
disconnectId=allConnectedId[i][1];
}
if(allConnectedId[i][1].match(socket.id))
{
found=true;
disconnectId=allConnectedId[i][0];
}
if(found==true)
{
allConnectedId.splice(i,1);
socket.broadcast.to(disconnectId).emit('disconnectto',{
msg:"disconnect"
});
}
}
console.log("User is disconnected having Id : "+socket.id);
});
});



//All DataBase work here
async function dbProcessing(userData)
{
try
{
var res;
const client=await MongoClient.connect(url, { useNewUrlParser: true });
var db=client.db('chessdb');
var user=await db.collection("UserDetails").find({Username:userData.Username}).toArray();
if(user.length==0)
{
   var email=await db.collection("UserDetails").find({Email:userData.Email}).toArray();
   if(email.length==0)
   {
      await db.collection("UserDetails").insertOne(userData);
      console.log("object inserted");
      connections.push([socket.id,userData.Username]);
      return 3;
    }
    else
    {
      console.log("email exists");
  return 2;
    }
}
else
{
console.log("User exists");
return 1;
}
client.close();
}catch(err)
{
console.log(err);
}
}