var connect_id;
var res_result="";
var connections=[];
var connectedId=[];
var allConnectedId=[];
var userName="";
var req_id;
var socket=io.connect('http://localhost:8086');
socket.on('connect',function(){
connect_id=socket.id;
console.log("client socket creation.");
});


function fetchData()
{
socket.emit('fetch',{
msg:"fetch"
});
}

socket.on('fetch',function(data)
{
connections=data.Connections;
allConnectedId=data.AllConnectedId;
});


function clickLink()
{
if(isPlaying==false && isLive==false)
{
socket.emit('link',{
msg:"link"
});
}
}

socket.on('link',function(data)
{
connections=data.Connections;
allConnectedId=data.AllConnectedId;
console.log(connections);
console.log(allConnectedId);
var list = document.getElementById("list");
for(var i=0;i<list.options.length;i++)
{
list.options[i]=null;
}
var connectionID=null;
var connectId;
if(connections.length==1)
{
list.options[0]=new Option("No Connection Available",'0',false,false);
}
else
{
for(var i=0,k=0;i<connections.length;i++)
{
connectionID=connections[i];
  if(connectionID[0]!=connect_id)
 {
     if(allConnectedId.length!=0)
    {
       var found=false;
      for(var j=0;j<allConnectedId.length;j++)
        {
         connectId=allConnectedId[j];
            if(connectId[0].match(connectionID[0]) || connectId[1].match(connectionID[0]))
           {
            found=true;
            break;            
            } 
         }
      if(found==true)
       {
        list.options[k]=new Option(connectionID[1]+"(In Game)",'0',false,false);     
        }
        else
       {
       list.options[k]=new Option(connectionID[1],'0',false,false);      
        }
      k++;
    }
    else
    {
    list.options[k]=new Option(connectionID[1],'0',false,false);
    k++;
    }  
 }
}
}
$('#modalForConnect').modal();
});


function login()
{
var logUsername=document.getElementById("logUsername");
var logPassword=document.getElementById("logPassword");
var valid=true;
if(logUsername.value.length==0)
{
logUsername.classList.add('change-color');
logUsername.placeholder="Enter User Name";
valid=false;
}
if(logPassword.value.length==0)
{
logPassword.classList.add('change-color');
logPassword.placeholder="Enter Password";
valid=false;
}
if((logUsername.value.length)!=0 && /\s/g.test(logUsername.value.trim()))
{
logUsername.classList.add('change-color');
logUsername.value="";
logUsername.placeholder="User Name Contain Space";
valid=false;
}
if(valid==true)
{
socket.emit('logindbconnection',{
Username:(logUsername.value.trim()).toLowerCase(),
Password:logPassword.value
});
}
}

socket.on('logindbconnection',function(dbRes){
var logUsername=document.getElementById("logUsername");
var logPassword=document.getElementById("logPassword");
if(dbRes.dbResponse==1) 
{
logUsername.classList.add('change-color');
logUsername.value="";
logUsername.placeholder="Username Doesn't Exists";
}
if(dbRes.dbResponse==2) 
{
logPassword.classList.add('change-color');
logPassword.value="";
logPassword.placeholder="Password Doesn't match";
}
if(dbRes.dbResponse==3) 
{
connections=dbRes.Connections;
allConnectedId=dbRes.AllConnectedId;
document.getElementById("userId").innerHTML="User ID : "+logUsername.value.trim();
$('#modalForLogin').modal('hide');
}

});

function registerAccount()
{
var username=document.getElementById("userName");
var email=document.getElementById("email");
var password=document.getElementById("password");
var repeatPassword=document.getElementById("repeatPassword");
var valid=true;
if(username.value.length==0)
{
username.classList.add('change-color');
username.placeholder="Enter User Name";
valid=false;
}
if(email.value.length==0)
{
email.classList.add('change-color');
email.placeholder="Enter Email Id";
valid=false;
}
if(password.value.length==0)
{
password.classList.add('change-color');
password.placeholder="Enter Password";
valid=false;
}
if(repeatPassword.value.length==0)
{
repeatPassword.classList.add('change-color');
repeatPassword.placeholder="Enter Password";
valid=false;
}
if((username.value.length)!=0 && /\s/g.test(username.value.trim()))
{
username.classList.add('change-color');
username.value="";
username.placeholder="User Name Contain Space";
valid=false;
}
if((password.value).match(repeatPassword.value)==null)
{
repeatPassword.classList.add('change-color');
repeatPassword.value="";
repeatPassword.placeholder="Password Doesn't Match";
valid=false;
}
if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)))
{
 email.classList.add('change-color');
 email.value="";
 email.placeholder="Incorrect Email Id";
valid=false;
}
if(valid==true)
{
socket.emit('userdbconnection',{
Username:(username.value.trim()).toLowerCase(),
Email:email.value.trim(),
Password:password.value
});
}
}

socket.on('userdbconnection',function(dbRes){
var username=document.getElementById("userName");
var email=document.getElementById("email");
if(dbRes.dbResponse==1) 
{
username.classList.add('change-color');
username.value="";
username.placeholder="Username exists";
}
if(dbRes.dbResponse==2) 
{
email.classList.add('change-color');
email.value="";
email.placeholder="Email Id exists";
}
if(dbRes.dbResponse==3) 
{
connections=dbRes.Connections;
allConnectedId=dbRes.AllConnectedId;
document.getElementById("userId").innerHTML="User ID : "+username.value.trim();
$('#modalForSignup').modal('hide');
$('#modalForLogin').modal();
}
});

function resetPassword()
{
var oldEmail=document.getElementById("oldEmail");
var newPassword=document.getElementById("newPassword");
var valid=true;
if(oldEmail.value.length==0)
{
oldEmail.classList.add('change-color');
oldEmail.placeholder="Enter Email Id";
valid=false;
}
if(newPassword.value.length==0)
{
newPassword.classList.add('change-color');
newPassword.placeholder="Enter New Password";
valid=false;
}
if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(oldEmail.value)))
{
 oldEmail.classList.add('change-color');
 oldEmail.value="";
 oldEmail.placeholder="Incorrect Email Id";
valid=false;
}
 if(valid==true)
{
 socket.emit('resetdbconnection',{
 Email:oldEmail.value.trim(),
 Password:newPassword.value
});
}
}

socket.on('resetdbconnection',function(dbRes){
var oldEmail=document.getElementById("oldEmail");
if(dbRes.dbResponse==1) 
{
oldEmail.classList.add('change-color');
oldEmail.value="";
oldEmail.placeholder="Email Id Doesn't Exists";
}
if(dbRes.dbResponse==2) 
{
$('#modalForForgotpassword').modal('hide');
$('#modalForLogin').modal();
}
});


function forgotPassword()
{
$('#modalForLogin').modal('hide');
$('#modalForForgotpassword').modal();
}

function createAccount()
{
$('#modalForForgotpassword').modal('hide');
$('#modalForLogin').modal('hide');
$('#modalForSignup').modal();
}

function loginAgain()
{
$('#modalForForgotpassword').modal('hide');
$('#modalForSignup').modal('hide');
$('#modalForLogin').modal();
}


function connect()
{
var list=document.getElementById("list");
var username=list.options[list.selectedIndex];
var connection,socketId;
if((username.text).match("No Connection Available"))
{
$(modalForConnect).modal('hide');
}
else
{
for(var i=0;i<connections.length;i++)
{
connection=connections[i];
if(connection[1].match(username.text))
{
socketId=connection[0];
break;
}
}
var inGame=false;
for(var i=0;i<allConnectedId.length;i++)
{
if(allConnectedId[i][0].match(socketId) || allConnectedId[i][1].match(socketId))
{
inGame=true;
break;
}
}
  if(inGame==true)
  {
   $(modalForConnect).modal('hide');
   $(modalForInGame).modal();
  }
  else
  {
   socket.emit('connectto',{
   id:socketId,
   user:userName    
   });
   $(modalForConnect).modal('hide');
   $(modalForSpinner).modal();
  }
}
}

socket.on('request',function(data)
{
req_id=data.id;
if((data.msg).match("request"))
{
document.getElementById("requestuser").innerHTML=data.user;
$(modalForRequest).modal();
}
});

function accept()
{
res_result="accept";
connectedId=[[socket.id,"black"],[req_id,"white"]];
document.getElementById("userLive").innerHTML="| Live";
oldPlayerName=(document.getElementById("userId").innerHTML)+" is playing...";
console.log(oldPlayerName);
socket.emit('connectedto',{
id:req_id,
msg:res_result
});
$(modalForRequest).modal('hide');
req_id="";
liveGame();
}

function denied()
{
res_result="denied";
socket.emit('connectedto',{
id:req_id,
msg:res_result
});
$(modalForRequest).modal('hide');
req_id="";
}

socket.on('response',function(data){
if(data.msg.match("denied"))
{
$(modalForSpinner).modal('hide');
}
else
{
currentPlayerName=(document.getElementById("userId").innerHTML)+" is playing..";
console.log(currentPlayerName);
document.getElementById("userLive").innerHTML="| Live";
connectedId=[[socket.id,"white"],[data.res_id,"black"]];
$(modalForSpinner).modal('hide');
liveGame();
}
});

socket.on('disconnectto',function(data){
if((data.msg).match("disconnect"))
{
oldPlayerName="";
currentPlayerName="";
mainView();
$(modalForDisconnect).modal();
//document.getElementById("clickableForLive").style.display="none";
document.getElementById("moves").style.display="none";
document.getElementById("gameStatus").style.display="none";
document.getElementById("userLive").innerHTML="";
}
});

function playing()
{
isPlaying=false;
newGame();
}