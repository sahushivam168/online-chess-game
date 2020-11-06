var ctx,board;
var allRect=[];
var allString=[];
var prevIndex=[];
var pathIndex=[];
var count=0;
var chance="white";
var touchWhiteRook1=0;
var touchWhiteRook2=0;
var touchBlackRook1=0;
var touchBlackRook2=0;
var touchWhiteKing=0;
var touchBlackKing=0;
var apponentColor=null;
var picesColor=null;
var whiteKingRect;
var blackKingRect;
var isBlackCheck=0;
var isWhiteCheck=0;
var indexOfApponent=[];
var apponentRect;
var kingPlaceColor="";
var isPlaying;
var isLive;
var myPices;
var clientRect;
var x,y;
var whitePawnCount=0;
var whiteKnightCount=0;
var whiteQueenCount=0;
var whiteBishopCount=0;
var whiteRookCount=0;
var blackPawnCount=0;
var blackKnightCount=0;
var blackQueenCount=0;
var blackBishopCount=0;
var blackRookCount=0;
var displayChance=document.getElementById("displayChance");
var displayPlayer=document.getElementById("displayPlayer");
var currentPlayerName="";
var oldPlayerName="";
function Rect()
{
 this.x=0;
 this.y=0;
 this.width=0;
 this.height=0;
 this.color="#FFFFFF";
 this.x_dim;
 this.y_dim;
 this.pathColor=0;
}

function DrawBoard()
{
var x;
var rect;
var offsetX=0;
var offsetY=0;
var n=1;
var m=0;
var temp;
for(x=1;x<=64;x++)
{
rect=new Rect();
rect.x=offsetX;
rect.y=offsetY;
rect.width=75;
rect.height=75;
if(n)
{ 
  if(x%2!=0) rect.color="#FFFFFF";
  else       rect.color="#4169E1";
}
if(m)
{
 if(x%2!=0) rect.color="#4169E1";
  else       rect.color="#FFFFFF";
}
if(x%8==0){
temp=n;
n=m;
m=temp;
offsetX=0;
offsetY=offsetY+75;
}
else{
offsetX=offsetX+75;
}

ctx.fillStyle=rect.color;
ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
allRect.push(rect);
}
}

function UpdateBoard()
{
for(var i=0;i<64;i++)
{
 if(allRect[i].pathColor==1)
   {     
     ctx.fillStyle=allRect[i].color;
     ctx.fillRect(allRect[i].x,allRect[i].y,allRect[i].width,allRect[i].height);
     ctx.beginPath();  
     ctx.arc(allRect[i].x+(allRect[i].width/2),allRect[i].y+(allRect[i].width/2),15, 0, 2 * Math.PI, false);
     ctx.fillStyle="#B0C4DE";
     ctx.fill();
   }
   else
   {
    if(allRect[i].pathColor==2) ctx.fillStyle="#4B0082";
    else  ctx.fillStyle=allRect[i].color;
    ctx.fillRect(allRect[i].x,allRect[i].y,allRect[i].width,allRect[i].height);
   }
}
}

function UpdateImages()
{
 var string,rect;
 var x=0;
   for(var i=0;i<8;i++)
  {
   for(var j=0;j<8;j++)
   {
    string=allString[i][j];
    if(string!="")
    {
     rect=allRect[x];
     ctx.drawImage(document.getElementById(string),rect.x,rect.y);
     }
    x++;
   }
  }
}

function CreateStringDs()
{
allString=[["whiteRook1","whiteKnight1","whiteBishop1","whiteQueen","whiteKing","whiteBishop2","whiteKnight2","whiteRook2"],
["whitePawn1","whitePawn2","whitePawn3","whitePawn4","whitePawn5","whitePawn6","whitePawn7","whitePawn8"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["blackPawn1","blackPawn2","blackPawn3","blackPawn4","blackPawn5","blackPawn6","blackPawn7","blackPawn8"],
["blackRook1","blackKnight1","blackBishop1","blackQueen","blackKing","blackBishop2","blackKnight2","blackRook2"],
];
var x=0;
for(var i=0;i<8;i++)
{
for(var j=0;j<8;j++)
{
allRect[x].x_dim=i;
allRect[x].y_dim=j;
if(i==0 && j==4) whiteKingRect=allRect[x];
if(i==7 && j==4) blackKingRect=allRect[x];
x++;
}
}
}

function newGame()
{
if(isPlaying==true)
{
console.log("isplaying");
$(modalForPlaying).modal();
}
if(isPlaying==false && isLive==false)
{
$(modalForPlay).modal();
}
}

function play()
{
board=document.getElementById("board");
ctx=board.getContext("2d");
DrawBoard();
CreateStringDs();
UpdateImages();
isPlaying=true;
document.getElementById("player1").style.display="block";
document.getElementById("player2").style.display="block";
document.getElementById("moves").style.display="block";
document.getElementById("clickable").style.display="block";
chance="white";
displayChance.innerHTML=chance;
changeSpan();
}

function liveGame()
{
if(isLive==false)
{
board=document.getElementById("board");
ctx=board.getContext("2d");
DrawBoard();
CreateStringDs();
UpdateImages();
isLive=true;
//document.getElementById("clickableForLive").style.display="block";
document.getElementById("gameStatus").style.display="block";
document.getElementById("moves").style.display="block";
displayChance.innerHTML=chance;
displayPlayer.innerHTML=currentPlayerName;
}
}

function mainView()
{
board=document.getElementById("board");
ctx=board.getContext("2d");
DrawBoard();
CreateStringDs();
blackKingRect.color="#4169E1";
whiteKingRect.color="#FFFFFF";
chance="white";
kingPlaceColor="";
count=0;
touchWhiteRook1=0;
touchWhiteRook2=0;
touchBlackRook1=0;
touchBlackRook2=0;
touchWhiteKing=0;
touchBlackKing=0;
apponentColor=null;
picesColor=null;
isBlackCheck=0;
isWhiteCheck=0;
indexOfApponent=[];
isLive=false;
isPlaying=false;
document.getElementById("player1").style.display="none";
document.getElementById("player2").style.display="none";
document.getElementById("moves").style.display="none";
document.getElementById("clickable").style.display="none";
displayChance.innerHTML=chance;
changeSpan();
}


function changeSpan()
{
document.getElementById("whitePawn").innerHTML=0;
document.getElementById("whiteKnight").innerHTML=0;
document.getElementById("whiteQueenSpan").innerHTML=0;
document.getElementById("whiteBishop").innerHTML=0;
document.getElementById("whiteRook").innerHTML=0;
document.getElementById("blackPawn").innerHTML=0;
document.getElementById("blackKnight").innerHTML=0;
document.getElementById("blackQueenSpan").innerHTML=0;
document.getElementById("blackBishop").innerHTML=0;
document.getElementById("blackRook").innerHTML=0;
whitePawnCount=0;
whiteKnightCount=0;
whiteQueenCount=0;
whiteBishopCount=0;
whiteRookCount=0;
blackPawnCount=0;
blackKnightCount=0;
blackQueenCount=0;
blackBishopCount=0;
blackRookCount=0;
}


window.onload=function()
{
board=document.getElementById("board");
ctx=board.getContext("2d");
DrawBoard();
isPlaying=false;
isLive=false;
fetchData();
board.onmousedown=function(e){
if(e.which==1)
{
if(isPlaying==true)
{
clientRect = e.target.getBoundingClientRect();
x = e.clientX - clientRect.left; 
y = e.clientY - clientRect.top;  
mymousedown(x,y);  
}
if(isLive==true)
{
myPices=connectedId[0][1];
var viewId=connectedId[1][0];
console.log(viewId);
if(myPices.match(chance))
{
clientRect = e.target.getBoundingClientRect();
x = e.clientX - clientRect.left; 
y = e.clientY - clientRect.top;  
mymousedown(x,y);
socket.emit('myclick',{
x : x,
y : y,
id : viewId
});
}
}
}
}
$("#modalForLogin").modal();
}

// web socket works
socket.on('myclick',function(data){
if(data.id!=connect_id) mousedownview(data.x,data.y);
});


function mousedownview(x,y)
{
displayChance.innerHTML=chance;
count++;
var rect,string;
for(var i=0;i<64;i++)
{
rect=allRect[i];
if(x<rect.x+rect.width+10 && y<rect.y+rect.height+10 && x>rect.x+10 && y>rect.y+10)
{
break;
}
}
string=allString[rect.x_dim][rect.y_dim];
if(string.match("white")) 
{
picesColor="white";
apponentColor="black";
}
if(string.match("black")) 
{
picesColor="black";
apponentColor="white";
}
if(count==3) count=1;
if(count==1)
{
  if(string=="") count=0;
  if(chance=="white")
   {
      if(string.match("whitePawn"))
      {
      getWhitePawnPath(rect);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteRook"))
      {
      getRookPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteBishop"))
      {
      getBishopPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteQueen"))
      {
      getQueenPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);      
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteKnight"))
      {
      getKnightPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteKing"))
      {     
      getKingPath(rect,apponentColor);     
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      } 
   }
   if(chance=="black")
   {
      if(string.match("blackPawn"))
      {
      getBlackPawnPath(rect);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackRook"))
      {
      getRookPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackBishop"))
      {
      getBishopPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackQueen"))
      {
      getQueenPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackKnight"))
      {
      getKnightPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackKing"))
      {     
      getKingPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
   }
}
if(count==2)
{   
  removeThePath();
  var found=0;
  for(var i=0;i<pathIndex.length;i++)
  {
   if(pathIndex[i][0]==rect.x_dim && pathIndex[i][1]==rect.y_dim)
    {      
     found=1;
     break; 
    }
  }
    if(found)
   {
        if(isBlackCheck==1)
          {
            blackKingRect.color=kingPlaceColor;
            isBlackCheck=0;
          }
        if(isWhiteCheck==1)
          {
            whiteKingRect.color=kingPlaceColor;
            isWhiteCheck=0;
          }
   var prevString=allString[prevIndex[0][0]][prevIndex[0][1]];
   allString[rect.x_dim][rect.y_dim]=prevString;
   allString[prevIndex[0][0]][prevIndex[0][1]]="";
   if(prevString.match("whitePawn") && rect.x_dim==7) 
   {
   if(rect.y_dim==0) allString[rect.x_dim][rect.y_dim]="whiteRook1";
   if(rect.y_dim==1) allString[rect.x_dim][rect.y_dim]="whiteKnight1";
   if(rect.y_dim==2) allString[rect.x_dim][rect.y_dim]="whiteBishop1";
   if(rect.y_dim==3) allString[rect.x_dim][rect.y_dim]="whiteQueen";
   if(rect.y_dim==5) allString[rect.x_dim][rect.y_dim]="whiteBishop2";
   if(rect.y_dim==6) allString[rect.x_dim][rect.y_dim]="whiteKnight2";
   if(rect.y_dim==7) allString[rect.x_dim][rect.y_dim]="whiteRook2";
   }
   if(prevString.match("blackPawn") && rect.x_dim==0) 
   {
   if(rect.y_dim==0) allString[rect.x_dim][rect.y_dim]="blackRook1";
   if(rect.y_dim==1) allString[rect.x_dim][rect.y_dim]="blackKnight1";
   if(rect.y_dim==2) allString[rect.x_dim][rect.y_dim]="blackBishop1";
   if(rect.y_dim==3) allString[rect.x_dim][rect.y_dim]="blackQueen";
   if(rect.y_dim==5) allString[rect.x_dim][rect.y_dim]="blackBishop2";
   if(rect.y_dim==6) allString[rect.x_dim][rect.y_dim]="blackKnight2";
   if(rect.y_dim==7) allString[rect.x_dim][rect.y_dim]="blackRook2";
   }
   if(prevString.match("King"))
   { 
    isBlackCheck=0;
    isWhiteCheck=0;
    if(prevString.match("whiteKing")) whiteKingRect=rect;
    if(prevString.match("blackKing")) blackKingRect=rect;
    if(prevIndex[0][1]+2==rect.y_dim) 
     {
         allString[prevIndex[0][0]][prevIndex[0][1]+1]=allString[rect.x_dim][rect.y_dim+1];
         allString[rect.x_dim][rect.y_dim+1]="";
      }
    if(prevIndex[0][1]-2==rect.y_dim)   
     {
         allString[prevIndex[0][0]][prevIndex[0][1]-1]=allString[rect.x_dim][rect.y_dim-2];
         allString[rect.x_dim][rect.y_dim-2]="";
      }
   }
   if(prevString.match("whiteKing")) touchWhiteKing++;
   if(prevString.match("blackKing")) touchBlackKing++;
   if(prevString.match("whiteRook1")) touchWhiteRook1=1;
   if(prevString.match("whiteRook2")) touchWhiteRook2=1;
   if(prevString.match("blackRook1")) touchBlackRook1=1;
   if(prevString.match("blackRook2")) touchBlackRook2=1;     
   if(chance=="white") 
   {
    chance="black";
    displayChance.innerHTML=chance;
    displayPlayer.innerHTML=oldPlayerName;
   }
   else 
    {
    chance="white";
     displayChance.innerHTML=chance;
     displayPlayer.innerHTML=currentPlayerName;
     }
   pathIndex=[];
   prevIndex.pop();
   apponentRect=rect;
   check(apponentRect);
   if(isBlackCheck==1 || isWhiteCheck==1)
{
   if(isBlackCheck==1) 
   {
    new Audio('checkAudio.mp3').play();
    blackKingRect.color="#FA1212";
    }
   if(isWhiteCheck==1) 
  { 
   new Audio('checkAudio.mp3').play();
   whiteKingRect.color="#FA1212";
  }
}
else
{
   new Audio('chessmoveon.mp3').play();
}
/*
   if(isBlackCheck==1)
   {
    checkMate(rect);
   }
   if(isWhiteCheck==1)
  {
   checkMate(rect);
  }
 */    
   ctx.clearRect(0,0,board.width,board.height); 
   UpdateBoard();
   UpdateImages();
  }
 prevIndex.pop();
 pathIndex=[];
}//if count==2
}//mousedownview ends


function mymousedown(x,y) 
{
displayChance.innerHTML=chance;
count++;
var rect,string;
for(var i=0;i<64;i++)
{
rect=allRect[i];
if(x<rect.x+rect.width+10 && y<rect.y+rect.height+10 && x>rect.x+10 && y>rect.y+10)
{
break;
}
}
string=allString[rect.x_dim][rect.y_dim];
if(string.match("white")) 
{
picesColor="white";
apponentColor="black";
}
if(string.match("black")) 
{
picesColor="black";
apponentColor="white";
}
if(count==3) count=1;
if(count==1)
{
  if(string=="") count=0;
  if(chance=="white")
   {
    console.log(myPices);
      if(string.match("whitePawn"))
      {
      getWhitePawnPath(rect);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteRook"))
      {
      getRookPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteBishop"))
      {
      getBishopPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteQueen"))
      {
      getQueenPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);      
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteKnight"))
      {
      getKnightPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("whiteKing"))
      {     
      getKingPath(rect,apponentColor);     
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      } 
   }
   if(chance=="black")
   {
    console.log(myPices);
    console.log(isLive);
      if(string.match("blackPawn"))
      {
      getBlackPawnPath(rect);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackRook"))
      {
      getRookPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackBishop"))
      {
      getBishopPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackQueen"))
      {
      getQueenPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackKnight"))
      {
      getKnightPath(rect,apponentColor);
      checkBecauseOf(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
      if(string.match("blackKing"))
      {     
      getKingPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      colorThePath(rect);
      }
   }
}
if(count==2)
{   
  removeThePath();
  var found=0;
  for(var i=0;i<pathIndex.length;i++)
  {
   if(pathIndex[i][0]==rect.x_dim && pathIndex[i][1]==rect.y_dim)
    {      
     found=1;
     break; 
    }
  }
    if(found)
   {
        if(isBlackCheck==1)
          {
            blackKingRect.color=kingPlaceColor;
            isBlackCheck=0;
          }
        if(isWhiteCheck==1)
          {
            whiteKingRect.color=kingPlaceColor;
            isWhiteCheck=0;
          }
   var prevString=allString[prevIndex[0][0]][prevIndex[0][1]];
   var killed=allString[rect.x_dim][rect.y_dim];
   if(killed.match("whitePawn")) 
{
   document.getElementById("whitePawn").innerHTML=whitePawnCount+1;
   whitePawnCount=whitePawnCount+1;
}
   if(killed.match("whiteKnight")) 
{
document.getElementById("whiteKnight").innerHTML=whiteKnightCount+1;
  whiteKnightCount=whiteKnightCount+1;
}
   if(killed.match("whiteQueen")) 
{
document.getElementById("whiteQueenSpan").innerHTML=whiteQueenCount+1;
whiteQueenCount=whiteQueenCount+1;
}
   if(killed.match("whiteBishop")) 
{
document.getElementById("whiteBishop").innerHTML=whiteBishopCount+1;
whiteBishopCount=whiteBishopCount+1;
}
   if(killed.match("whiteRook")) 
{
document.getElementById("whiteRook").innerHTML=whiteRookCount+1;
whiteRookCount=whiteRookCount+1;
}
   if(killed.match("blackPawn")) 
{
document.getElementById("blackPawn").innerHTML=blackPawnCount+1;
blackPawnCount=blackPawnCount+1;
}
   if(killed.match("blackKnight")) 
{
document.getElementById("blackKnight").innerHTML=blackKnightCount+1;
blackKnightCount=blackKnightCount+1;
}
   if(killed.match("blackQueen")) 
{
document.getElementById("blackQueenSpan").innerHTML=blackQueenCount+1;
blackQueenCount=blackQueenCount+1;
}
   if(killed.match("blackBishop")) 
{
document.getElementById("blackBishop").innerHTML=blackBishopCount+1;
blackBishopCount=blackBishopCount+1;
}
   if(killed.match("blackRook")) 
{
document.getElementById("blackRook").innerHTML=blackRookCount+1;
blackRookCount=blackRookCount+1;
}
   allString[rect.x_dim][rect.y_dim]=prevString;
   allString[prevIndex[0][0]][prevIndex[0][1]]="";  
   if(prevString.match("whitePawn") && rect.x_dim==7) 
   {
   if(rect.y_dim==0) allString[rect.x_dim][rect.y_dim]="whiteRook1";
   if(rect.y_dim==1) allString[rect.x_dim][rect.y_dim]="whiteKnight1";
   if(rect.y_dim==2) allString[rect.x_dim][rect.y_dim]="whiteBishop1";
   if(rect.y_dim==3) allString[rect.x_dim][rect.y_dim]="whiteQueen";
   if(rect.y_dim==5) allString[rect.x_dim][rect.y_dim]="whiteBishop2";
   if(rect.y_dim==6) allString[rect.x_dim][rect.y_dim]="whiteKnight2";
   if(rect.y_dim==7) allString[rect.x_dim][rect.y_dim]="whiteRook2";
   }
   if(prevString.match("blackPawn") && rect.x_dim==0) 
   {
   if(rect.y_dim==0) allString[rect.x_dim][rect.y_dim]="blackRook1";
   if(rect.y_dim==1) allString[rect.x_dim][rect.y_dim]="blackKnight1";
   if(rect.y_dim==2) allString[rect.x_dim][rect.y_dim]="blackBishop1";
   if(rect.y_dim==3) allString[rect.x_dim][rect.y_dim]="blackQueen";
   if(rect.y_dim==5) allString[rect.x_dim][rect.y_dim]="blackBishop2";
   if(rect.y_dim==6) allString[rect.x_dim][rect.y_dim]="blackKnight2";
   if(rect.y_dim==7) allString[rect.x_dim][rect.y_dim]="blackRook2";
   }
   if(prevString.match("King"))
   { 
    isBlackCheck=0;
    isWhiteCheck=0;
    if(prevString.match("whiteKing")) whiteKingRect=rect;
    if(prevString.match("blackKing")) blackKingRect=rect;
    if(prevIndex[0][1]+2==rect.y_dim) 
     {
         allString[prevIndex[0][0]][prevIndex[0][1]+1]=allString[rect.x_dim][rect.y_dim+1];
         allString[rect.x_dim][rect.y_dim+1]="";
      }
    if(prevIndex[0][1]-2==rect.y_dim)   
     {
         allString[prevIndex[0][0]][prevIndex[0][1]-1]=allString[rect.x_dim][rect.y_dim-2];
         allString[rect.x_dim][rect.y_dim-2]="";
      }
   }
   if(prevString.match("whiteKing")) touchWhiteKing++;
   if(prevString.match("blackKing")) touchBlackKing++;
   if(prevString.match("whiteRook1")) touchWhiteRook1=1;
   if(prevString.match("whiteRook2")) touchWhiteRook2=1;
   if(prevString.match("blackRook1")) touchBlackRook1=1;
   if(prevString.match("blackRook2")) touchBlackRook2=1;     
   if(chance=="white") {
   chance="black";
   displayChance.innerHTML=chance;
   displayPlayer.innerHTML=oldPlayerName;
   }
   else 
    {
     chance="white";
     displayChance.innerHTML=chance;
     displayPlayer.innerHTML=currentPlayerName;
    }
   pathIndex=[];
   prevIndex.pop();
   apponentRect=rect;
   check(apponentRect);
   if(isBlackCheck==1 || isWhiteCheck==1)
{
   if(isBlackCheck==1) 
   {
    new Audio('checkAudio.mp3').play();
    blackKingRect.color="#FA1212";
    }
   if(isWhiteCheck==1) 
  { 
   new Audio('checkAudio.mp3').play();
   whiteKingRect.color="#FA1212";
  }
}
else
{
   new Audio('chessmoveon.mp3').play();
}
/*
   if(isBlackCheck==1)
   {
    checkMate(rect);
   }
   if(isWhiteCheck==1)
  {
   checkMate(rect);
  }
 */    
   ctx.clearRect(0,0,board.width,board.height); 
   UpdateBoard();
   UpdateImages();
  }
 prevIndex.pop();
 pathIndex=[];
}//if count==2
}//mymousedown ends

 function checkBecauseOf(rect,apponentColor)
{
  var rectX=rect.x_dim;
  var rectY=rect.y_dim;
  var placed,x_dim,y_dim;
  var verifyPath=[];
  var x,y,check;
  if(apponentColor.match("black")) 
  {
  x=whiteKingRect.x_dim;
  y=whiteKingRect.y_dim;
  }
  else
   {
  x=blackKingRect.x_dim;
  y=blackKingRect.y_dim;  
   }
  for(var l=0;l<pathIndex.length;l++)
 {
  check=false;
  placed=allString[pathIndex[l][0]][pathIndex[l][1]]; 
  put=allString[rectX][rectY];
  allString[pathIndex[l][0]][pathIndex[l][1]]=allString[rectX][rectY];
  allString[rectX][rectY]="";
for(k=y-1;k>=0;k--)   // check from queen and rook
{
x_dim=x;
y_dim=k;
if(allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) check=true;
break;
}
}
for(k=y+1;k<=7;k++)
{
x_dim=x;
y_dim=k;
if(allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) check=true;
break;
}
}
for(k=x-1;k>=0;k--)
{
x_dim=k;
y_dim=y;
if(allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) check=true;
break;
}
}
for(k=x+1;k<=7;k++)
{
y_dim=y;
x_dim=k;
if(allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) check=true;
break;
}
}
                 //check from bishop and queen
    for(k=y-1,x_dim=x+1;k>=0 && x_dim!=8;k--) 
   {   
    y_dim=k;   
     if(allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) check=true;
     break;
    }
    x_dim++;
   }   
   for(k=x-1,y_dim=y+1;k>=0 && y_dim!=8;k--)
   {
    x_dim=k;
     if(allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
       if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) check=true;
     break;
    }
    y_dim++;
   }   
   for(k=y-1,x_dim=x-1;k>=0 && x_dim!=-1;k--)
   {  
    y_dim=k;
   if(allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) check=true;
     break;
    }
   x_dim--;
   }    
   for(k=x+1,y_dim=y+1;k<=7 && y_dim!=8;k++)
   {
    x_dim=k; 
    if(allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) check=true;
     break;
    }
   y_dim++;
   }
  if(check==false)
{
 verifyPath.push([pathIndex[l][0],pathIndex[l][1]]);
}  
 allString[pathIndex[l][0]][pathIndex[l][1]]=placed;
 allString[rectX][rectY]=put;
}//main loop ends
pathIndex=[];
pathIndex=verifyPath;
}//becauseOf function ends

function check(rect)
{
//console.log("Black check : "+isBlackCheck);
//console.log("White Check : "+isWhiteCheck);
var string=allString[rect.x_dim][rect.y_dim];
if(string.match("white"))
{
      picesColor="white";
      apponentColor="black"; 
      if(string.match("whitePawn"))
      {
      getWhitePawnPath(rect);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
      if(string.match("whiteRook"))
      {
      getRookPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);     
      }
      if(string.match("whiteBishop"))
      {
      getBishopPath(rect,apponentColor);    
      prevIndex.push([rect.x_dim,rect.y_dim]);   
      }
      if(string.match("whiteQueen"))
      {
      getQueenPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);    
      }
      if(string.match("whiteKnight"))
      {
      getKnightPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);    
      }
      if(string.match("whiteKing"))
      {     
      getKingPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
for(var i=0;i<pathIndex.length;i++)
{
  var pi=pathIndex[i]; 
  if(pi[0]==blackKingRect.x_dim && pi[1]==blackKingRect.y_dim)
  {
   isBlackCheck=1;
   indexOfApponent=[[rect.x_dim,rect.y_dim]];
   kingPlaceColor=blackKingRect.color;
  }
}
}

if(string.match("black"))
   {
picesColor="black";
apponentColor="white";
      if(string.match("blackPawn"))
      {
      getBlackPawnPath(rect);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
      if(string.match("blackRook"))
      {
      getRookPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
      if(string.match("blackBishop"))
      {
      getBishopPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
      if(string.match("blackQueen"))
      {
      getQueenPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
      if(string.match("blackKnight"))
      {
      getKnightPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
      if(string.match("blackKing"))
      {     
      getKingPath(rect,apponentColor);
      prevIndex.push([rect.x_dim,rect.y_dim]);
      }
for(var i=0;i<pathIndex.length;i++)
{
 var pi=pathIndex[i];
  if(pi[0]==whiteKingRect.x_dim && pi[1]==whiteKingRect.y_dim)
  {
   isWhiteCheck=1;
  indexOfApponent=[[rect.x_dim,rect.y_dim]];
  kingPlaceColor=whiteKingRect.color;
  }
}
  }

}//check ends


function getWhitePawnPath(rect)
{
var x,y;                            
x=rect.x_dim;
y=rect.y_dim;
  if(x==1)
  {
    if(allString[x+1][y]=="")
     {
      pathIndex.push([x+1,y]);
     }
     if(allString[x+1][y]=="" && allString[x+2][y]=="")
     {
       pathIndex.push([x+2,y]);
     }
     if(y!=0 && (allString[x+1][y-1]).match("black"))
     {
         pathIndex.push([x+1,y-1]);               
     }
     if(y!=7 && (allString[x+1][y+1]).match("black"))
     {
         pathIndex.push([x+1,y+1]);      
     }
    
  }
  else
  {
     if(x!=7 && allString[x+1][y]=="")
     {
      pathIndex.push([x+1,y]);   
     }
     if(y!=0 && (allString[x+1][y-1]).match("black"))
     {
        pathIndex.push([x+1,y-1]);       
     }
     if(y!=7 && (allString[x+1][y+1]).match("black"))
     {
       pathIndex.push([x+1,y+1]);   
     }
   }
}//getWhitePawnPath ends

function getBlackPawnPath(rect)
{
var x,y;                            
x=rect.x_dim;
y=rect.y_dim;
  if(x==6)
  {
    if(allString[x-1][y]=="")
     {
      pathIndex.push([x-1,y]);     
     }
     if(allString[x-1][y]=="" && allString[x-2][y]=="")
     {
       pathIndex.push([x-2,y]);       
     }
     if(y!=0 && (allString[x-1][y-1]).match("white"))
     {
         pathIndex.push([x-1,y-1]);               
     }
     if(y!=7 && (allString[x-1][y+1]).match("white"))
     {
         pathIndex.push([x-1,y+1]);        
     }
    
  }
  else
  {
     if(allString[x-1][y]=="")
     {
      pathIndex.push([x-1,y]);     
     }
     if(y!=0 && (allString[x-1][y-1]).match("white"))
     {
         pathIndex.push([x-1,y-1]);               
     }
     if(y!=7 && (allString[x-1][y+1]).match("white"))
     {
         pathIndex.push([x-1,y+1]);        
     }
  }

}//getBlackPawnPath ends

function getRookPath(rect,apponentColor)
{
var x,y,x_dim,y_dim;                            
x=rect.x_dim;
y=rect.y_dim;
 for(var i=y-1;i>=0;i--)
{
y_dim=i;
x_dim=x;
if(y!=y_dim && allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
pathIndex.push([x_dim,y_dim]);
break;
}
if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
}

for(var i=y+1;i<=7;i++)
{
y_dim=i;
x_dim=x;
if(y!=y_dim && allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
pathIndex.push([x_dim,y_dim]);
break;
}
if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
}

for(var i=x-1;i>=0;i--)
{
y_dim=y;
x_dim=i;
if(x!=x_dim && allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
pathIndex.push([x_dim,y_dim]);
break;
}
if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
}
for(var i=x+1;i<=7;i++)
{
y_dim=y;
x_dim=i;
if(x!=x_dim && allString[x_dim][y_dim].match(picesColor)) break;
if(allString[x_dim][y_dim].match(apponentColor))
{
pathIndex.push([x_dim,y_dim]);
break;
}
if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
}
}//getRookPath ends

function getBishopPath(rect)
{
var x,y,x_dim,y_dim;                            
x=rect.x_dim;
y=rect.y_dim;
   for(var i=y-1,x_dim=x+1;i>=0 && x_dim!=8;i--)
   {   
     y_dim=i;   
     if(x!=x_dim && allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     pathIndex.push([x_dim,y_dim]);
     break;
    }
    if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
    x_dim++;
   }
   
   for(var i=x-1,y_dim=y+1;i>=0 && y_dim!=8;i--)
   {
    x_dim=i;
    if(y!=y_dim && allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     pathIndex.push([x_dim,y_dim]);
     break;
    }
    if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
    y_dim++;
   }
   
   for(var i=y-1,x_dim=x-1;i>=0 && x_dim!=-1;i--)
   {  
    y_dim=i;
    if(x!=x_dim && allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     pathIndex.push([x_dim,y_dim]);
     break;
    }
    if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
   x_dim--;
   }
    
   for(var i=x+1,y_dim=y+1;i<=7 && y_dim!=8;i++)
   {
    x_dim=i; 
    if(y!=y_dim && allString[x_dim][y_dim].match(picesColor)) break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     pathIndex.push([x_dim,y_dim]);
     break;
    }
    if(allString[x_dim][y_dim]=="") pathIndex.push([x_dim,y_dim]);
    y_dim++;
   }
}//getBishopPath ends


function getQueenPath(rect)
{
getRookPath(rect,apponentColor);
getBishopPath(rect,apponentColor);
}//getQueenPath ends


function getKnightPath(rect)
{
var x,y,x_dim1,y_dim1,x_dim2,y_dim2;                            
x=rect.x_dim;
y=rect.y_dim;
y_dim1=y-2;
x_dim1=x-1;
x_dim2=x+1;
if(-1<y_dim1 && y_dim1<8 && -1<x_dim1 && x_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor) || allString[x_dim1][y_dim1]=="")
 { 
   pathIndex.push([x_dim1,y_dim1]);
 }
}
if(-1<y_dim1 && y_dim1<8 && -1<x_dim2 && x_dim2<8)
{
  if((allString[x_dim2][y_dim1]).match(apponentColor) || allString[x_dim2][y_dim1]=="")
 { 
   pathIndex.push([x_dim2,y_dim1]);
 }
}
y_dim1=y+2;
x_dim1=x-1;
x_dim2=x+1;
if(-1<y_dim1 && y_dim1<8 && -1<x_dim1 && x_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor) || allString[x_dim1][y_dim1]=="")
 { 
   pathIndex.push([x_dim1,y_dim1]);
 }
}
if(-1<y_dim1 && y_dim1<8 && -1<x_dim2 && x_dim2<8)
{
  if((allString[x_dim2][y_dim1]).match(apponentColor) || allString[x_dim2][y_dim1]=="")
 { 
   pathIndex.push([x_dim2,y_dim1]);
 }
}

x_dim1=x-2;
y_dim1=y-1;
y_dim2=y+1;
if(-1<x_dim1 && x_dim1<8 && -1<y_dim1 && y_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor) || allString[x_dim1][y_dim1]=="")
 { 
   pathIndex.push([x_dim1,y_dim1]);
 }
}
if(-1<x_dim1 && x_dim1<8 && -1<y_dim2 && y_dim2<8)
{
  if((allString[x_dim1][y_dim2]).match(apponentColor) || allString[x_dim1][y_dim2]=="")
 { 
   pathIndex.push([x_dim1,y_dim2]);
 }
}

x_dim1=x+2;
y_dim1=y-1;
y_dim2=y+1;
if(-1<x_dim1 && x_dim1<8 && -1<y_dim1 && y_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor) || allString[x_dim1][y_dim1]=="")
 { 
   pathIndex.push([x_dim1,y_dim1]);
 }
}
if(-1<x_dim1 && x_dim1<8 && -1<y_dim2 && y_dim2<8)
{
  if((allString[x_dim1][y_dim2]).match(apponentColor) || allString[x_dim1][y_dim2]=="")
 { 
   pathIndex.push([x_dim1,y_dim2]);
 }
}
}//getKnightPath ends


function getKingPath(rect,apponentColor)
{
var lhx,lhy,rhx,rhy,uvx,uvy,dvx,dvy;
lhx=rect.x_dim;
lhy=rect.y_dim-1;
rhx=rect.x_dim;
rhy=rect.y_dim+1;
uvx=rect.x_dim-1;
uvy=rect.y_dim;
dvx=rect.x_dim+1;
dvy=rect.y_dim;
if(lhx>-1 && lhx<8 && lhy>-1 && lhy<8)
{
if(allString[lhx][lhy]=="") pathIndex.push([lhx,lhy]);
}
if(rhx>-1 && rhx<8 && rhy>-1 && rhy<8)
{
if(allString[rhx][rhy]=="") pathIndex.push([rhx,rhy]);
}
if(uvx>-1 && uvx<8 && uvy>-1 && uvy<8)
{
if(allString[uvx][uvy]=="") pathIndex.push([uvx,uvy]);
}
if(dvx>-1 && dvx<8 && dvy>-1 && dvy<8)
{
if(allString[dvx][dvy]=="") pathIndex.push([dvx,dvy]);
}
lhx=rect.x_dim+1;
lhy=rect.y_dim-1;
rhx=rect.x_dim+1;
rhy=rect.y_dim+1;
uvx=rect.x_dim-1;
uvy=rect.y_dim-1;
dvx=rect.x_dim-1;
dvy=rect.y_dim+1;
if(lhx>-1 && lhx<8 && lhy>-1 && lhy<8)
{
if(allString[lhx][lhy]=="") pathIndex.push([lhx,lhy]);
if(allString[lhx][lhy].match(apponentColor)) pathIndex.push([lhx,lhy]);
}
if(rhx>-1 && rhx<8 && rhy>-1 && rhy<8)
{
if(allString[rhx][rhy]=="") pathIndex.push([rhx,rhy]);
if(allString[rhx][rhy].match(apponentColor)) pathIndex.push([rhx,rhy]);
}
if(uvx>-1 && uvx<8 && uvy>-1 && uvy<8)
{
if(allString[uvx][uvy]=="") pathIndex.push([uvx,uvy]);
if(allString[uvx][uvy].match(apponentColor)) pathIndex.push([uvx,uvy]);
}
if(dvx>-1 && dvx<8 && dvy>-1 && dvy<8)
{
if(allString[dvx][dvy]=="") pathIndex.push([dvx,dvy]);
if(allString[dvx][dvy].match(apponentColor)) pathIndex.push([dvx,dvy]);
}
if(picesColor.match("white"))
{
if(touchWhiteKing==0 && touchWhiteRook1==0 && allString[rect.x_dim][rect.y_dim+1]=="" && allString[rect.x_dim][rect.y_dim+2]=="") pathIndex.push([rect.x_dim,rect.y_dim+2]);
if(touchWhiteKing==0 && touchWhiteRook2==0 && allString[rect.x_dim][rect.y_dim-1]=="" && allString[rect.x_dim][rect.y_dim-2]=="" && allString[rect.x_dim][rect.y_dim-3]=="") pathIndex.push([rect.x_dim,rect.y_dim-2]);
}
if(picesColor.match("black"))
{
if(touchBlackKing==0 && touchBlackRook1==0 && allString[rect.x_dim][rect.y_dim+1]=="" && allString[rect.x_dim][rect.y_dim+2]=="") pathIndex.push([rect.x_dim,rect.y_dim+2]);
if(touchBlackKing==0 && touchBlackRook2==0 && allString[rect.x_dim][rect.y_dim-1]=="" && allString[rect.x_dim][rect.y_dim-2]=="" && allString[rect.x_dim][rect.y_dim-3]=="") pathIndex.push([rect.x_dim,rect.y_dim-2]);
}
getKingCheckPath(apponentColor);
}//getKingPath ends


function getKingCheckPath(apponentColor)
{
        var checkedIndex;
        var k,x,y,x_dim,y_dim;
        var removable=false; 
        var x_dim1,y_dim1,x_dim2,y_dim2;       
       for(var i=0;i<pathIndex.length;i++)   //main loop travel pathIndex
      {   
          removable=false;
          checkedIndex=pathIndex[i];         
          x=checkedIndex[0];   
          y=checkedIndex[1]; 
for(k=y-1;k>=0;k--)   // check from queen and rook
{
x_dim=x;
y_dim=k;
if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) removable=true;
break;
}
}
for(k=y+1;k<=7;k++)
{
x_dim=x;
y_dim=k;
if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) removable=true;
break;
}
}
for(k=x-1;k>=0;k--)
{
x_dim=k;
y_dim=y;
if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) removable=true;
break;
}
}
for(k=x+1;k<=7;k++)
{
y_dim=y;
x_dim=k;
if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
if(allString[x_dim][y_dim].match(apponentColor))
{
if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Rook")) removable=true;
break;
}
}
                  //check from bishop and queen

    for(k=y-1,x_dim=x+1;k>=0 && x_dim!=8;k--) 
   {   
    y_dim=k;   
     if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) removable=true;
     break;
    }
    x_dim++;
   }
   
   for(k=x-1,y_dim=y+1;k>=0 && y_dim!=8;k--)
   {
    x_dim=k;
     if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
       if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) removable=true;
     break;
    }
    y_dim++;
   }
   
   for(k=y-1,x_dim=x-1;k>=0 && x_dim!=-1;k--)
   {  
    y_dim=k;
   if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) removable=true;
     break;
    }
   x_dim--;
   }
    
   for(k=x+1,y_dim=y+1;k<=7 && y_dim!=8;k++)
   {
    x_dim=k; 
    if(allString[x_dim][y_dim].match(picesColor) && allString[x_dim][y_dim]!=picesColor+"King") break;
     if(allString[x_dim][y_dim].match(apponentColor))
    {
     if(allString[x_dim][y_dim].match(apponentColor+"Queen") || allString[x_dim][y_dim].match(apponentColor+"Bishop")) removable=true;
     break;
    }
   y_dim++;
   }
                  //check from knight  
y_dim1=y-2;
x_dim1=x-1;
x_dim2=x+1;
if(-1<y_dim1 && y_dim1<8 && -1<x_dim1 && x_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor+"Knight")) removable=true;
}
if(-1<y_dim1 && y_dim1<8 && -1<x_dim2 && x_dim2<8)
{
  if((allString[x_dim2][y_dim1]).match(apponentColor+"Knight")) removable=true;
}  
y_dim1=y+2;
x_dim1=x-1;
x_dim2=x+1;
if(-1<y_dim1 && y_dim1<8 && -1<x_dim1 && x_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor+"Knight")) removable=true; 
}
if(-1<y_dim1 && y_dim1<8 && -1<x_dim2 && x_dim2<8)
{
  if((allString[x_dim2][y_dim1]).match(apponentColor+"Knight")) removable=true;
}
x_dim1=x-2;
y_dim1=y-1;
y_dim2=y+1;
if(-1<x_dim1 && x_dim1<8 && -1<y_dim1 && y_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor+"Knight")) removable=true;
}
if(-1<x_dim1 && x_dim1<8 && -1<y_dim2 && y_dim2<8)
{
  if((allString[x_dim1][y_dim2]).match(apponentColor+"Knight")) removable=true;
}
x_dim1=x+2;
y_dim1=y-1;
y_dim2=y+1;
if(-1<x_dim1 && x_dim1<8 && -1<y_dim1 && y_dim1<8)
{
  if((allString[x_dim1][y_dim1]).match(apponentColor+"Knight")) removable=true;
}
if(-1<x_dim1 && x_dim1<8 && -1<y_dim2 && y_dim2<8)
{
  if((allString[x_dim1][y_dim2]).match(apponentColor+"Knight")) removable=true;
}

     // check from only whitepawn and whiteking
if(x!=0 && x!=7)
{
if(y!=0)
{
if(allString[x-1][y-1].match(apponentColor+"Pawn") || allString[x-1][y-1].match(apponentColor+"King")) removable=true;
if(allString[x+1][y-1].match(apponentColor+"King")) removable=true;
}
if(y!=7)
{
if(allString[x-1][y+1].match(apponentColor+"Pawn") || allString[x-1][y+1].match(apponentColor+"King")) removable=true;
if(allString[x+1][y+1].match(apponentColor+"King")) removable=true;
}
}
   if(removable==true) 
   {
     pathIndex.splice(i,1);
     i=i-1;
   }
     }//main loop ends      
}//getKingCheckPath ends


function colorThePath(rect)
{
rect.pathColor=2;
var path;
var ary_rect;
for(var i=0;i<pathIndex.length;i++)
{
path=pathIndex[i];
   for(var j=0;i<allRect.length;j++)
  { 
     ary_rect=allRect[j];
     if(path[0]==ary_rect.x_dim && path[1]==ary_rect.y_dim)
     {
      allRect[j].pathColor=1;       
      break;
     }
  } 
}
ctx.clearRect(0,0,board.width,board.height); 
UpdateBoard();
UpdateImages();
}//colorThePath ends 


function removeThePath()
{
for(var i=0;i<64;i++)
{
allRect[i].pathColor=0;
}
ctx.clearRect(0,0,board.width,board.height); 
UpdateBoard();
UpdateImages();
}