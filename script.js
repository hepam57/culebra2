//CONTROLES
//let divRectangle = document.getElementsByClassName("rectangle")[0];
let btnGenerar = document.getElementById('generar');
let btnEliminar = document.getElementById('eliminar');
let edtTxt = document.getElementById('txt');
let chCheck = document.getElementById('check');
let lbLbl = document.getElementById('lbl');
let body =document.getElementsByTagName('body')[0];
let header =document.getElementsByTagName('header')[0];
//BTN MOVIL
let btnUp = document.getElementById('arriba');
let btnRigth = document.getElementById('derecha');
let btnDown = document.getElementById('abajo');
let btnLeft = document.getElementById('izquierda');


//VARIABLES
var interval;
var isPushed=false;
var score=0;
var maxscore=0;
var count=0;
const MAXIMO=3;
var sorpresa=0;

//EVENTOS MOVIL
btnUp.addEventListener('touchstart',onKeyDownHandlerMovil);
btnRigth.addEventListener('touchstart',onKeyDownHandlerMovil);
btnDown.addEventListener('touchstart',onKeyDownHandlerMovil);
btnLeft.addEventListener('touchstart',onKeyDownHandlerMovil);

//EVENTOS
btnGenerar.addEventListener('click',onClick);
btnEliminar.addEventListener('click',onClickDelete);
chCheck.addEventListener('click',onChecked);

function onChecked(evento)
{   
  if(evento.target.checked)
  {
    body.style.backgroundColor = "black";
    lbLbl.style.color='white';
    body.style.borderColor='white';
    header.style.borderColor='white';
    header.style.backgroundColor='black';
    culebra.forEach((el)=>{el.style.backgroundColor="white"});
  } else
  {
    body.style.backgroundColor = "white";
    lbLbl.style.color='black';
    body.style.borderColor='black';
    header.style.borderColor='black';
    header.style.backgroundColor='rgb(173, 173, 173)';
    culebra.forEach((el)=>{el.style.backgroundColor="black"});
  }
}

function onClickDelete(evento)
{   
    clearInterval(interval);
    direction=0;
    score=0;
    count=0;
    sorpresa=0;
    let elementos = document.getElementsByClassName('eliminar');
    while(elementos.length>0)
    {
      document.body.removeChild(elementos[0]);
    }
    
    while(culebra.length>0)
    {
        culebra.pop();
    }    

}

function onClick(evento)
{   if (!edtTxt.value)
    {
     alert('Digite un nivel.')
     return ;
    }else if(culebra.length != 0 ) 
    {
      return;
    }
    
    CrecerCulebra();
    interval=setInterval(MoverCulebra, 30*10/Number(4));    
    ComidaAleatoria();
}

//////CODE
let directions=['right','left','up','down'];
let direction=0;
const culebra=[];


function CrecerCulebra()
{
    let newDiv= document.createElement('div');
    newDiv.classList.add('rectangle');
    newDiv.classList.add('eliminar');
    newDiv.style.backgroundColor = ObtenerColor();
    newDiv.style.width=10+'px';
    newDiv.style.height=10+'px';
    if(culebra.length === 0)
    {   newDiv.style.left=10+'px';
        newDiv.style.top=80+'px';
        culebra.push(newDiv);
    }else
    {
        newDiv.style.left=culebra[culebra.length-1].style.left;
        newDiv.style.top=culebra[culebra.length-1].style.top;
        MoverCulebra();
        culebra.push(newDiv);        
    }
    body.appendChild(newDiv); 
}

function MoverCulebra()
{ 
  //clearInterval(interval);
  let oldTop,auxTop;
  let oldLeft,auxLeft;
  for(let i=0;i<culebra.length;i++)
  {
    auxTop=culebra[i].style.top;
    auxLeft=culebra[i].style.left;
    if(i==0)
    {  
        if(directions[direction]=='right')
        {
           culebra[i].style.left=Number(Number((culebra[i].style.left).slice(0,-2))+10)+'px';
        }else if(directions[direction]=='left')
        {
            culebra[i].style.left=Number(Number((culebra[i].style.left).slice(0,-2))-10)+'px';
        }else if(directions[direction]=='up')
        {
            culebra[i].style.top=Number(Number((culebra[i].style.top).slice(0,-2))-10)+'px';       
        }else if(directions[direction]=='down')
        {
            culebra[i].style.top=Number(Number((culebra[i].style.top).slice(0,-2))+10)+'px';       
        }
    }else
    {       
        culebra[i].style.top=oldTop;
        culebra[i].style.left=oldLeft;
    } 
    oldTop=auxTop;
    oldLeft=auxLeft;
  }
  //VALIDAR SI ESTA SOBRE COMIDA
  let x=Number((culebra[0].style.left).slice(0,-2))+5;
  let y=Number((culebra[0].style.top).slice(0,-2))+5;
  if(OverFood(x,y))
  { sorpresa+=1;
    count+=1; 
    CrecerCulebra();
    ComidaAleatoria();
    UpScore();
    IsSorpresa();
  }
  //VALIDAR SI ESTA SOBRE CULEBRA
  else if(OverSnake(x,y))
  {
      alert('Perdiste!!!  Puntaje ='+score +' - Puntaje Maximo = '+maxscore);
      onClickDelete() ;
  }
  //interval=setInterval(MoverCulebra, Number(edtTxt.value*100));  
  isPushed=false;
}

function OverSnake(x,y)
{
    culebra[0].hidden = true;
    let elemBelow = document.elementFromPoint(x, y);
    culebra[0].hidden = false;

    if(((x<10)||(x>window.innerWidth-10))||((y<80)||(y>window.innerHeight-10))||(!elemBelow))
    return true;

    let droppableBelow = elemBelow.closest('.rectangle');
    if ( droppableBelow) 
    {
        return true ;
    }
    else
    {
        return false;
    }
}


function OverFood(x,y)
{
    culebra[0].hidden = true;
    let elemBelow = document.elementFromPoint(x, y);
    culebra[0].hidden = false;
  
    if (!elemBelow) return false;
  
    let droppableBelow = elemBelow.closest('.droppable');
    if (droppableBelow) 
    {
      body.removeChild(droppableBelow);  
      return true;
    }
    return false;
}

function IsSorpresa()
{
    if(sorpresa===25)
    {
        alert('QUIERES RECLAMAR TU PREMIO?');
        alert('EN SERIO LO QUIERES RECLAMAR?');
        alert('NO TE CREO EN SERIO LO QUIERES RECLAMAR?');
        alert('OK DALE ACEPTAR');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');
        alert('OTRA VEZ!!');      
        alert('AHORA SI!!');      
        alert('AHORA TE LO JURO QUE SI!!'); 
        alert('TE LO PROMETO QUE SI!!'); 
        alert('O MEJOR NO!!'); 
        alert('BUENOS SI!!'); 
        alert('AHORA SI!!');
        alert('TE HAS GANADO MI CORAZÓN, TE AMO PRINCESA HERMOSA :* ;) :).')
    }
}

function UpScore()
{   if(count == MAXIMO)
    {
     score+=16;
     count=0;
    }
    else
    {
     score+=8;
    }
    if (score>maxscore)
     maxscore=score;
}

function ComidaAleatoria()
{
    let rdnLeft=Math.ceil(Math.random()*Math.ceil((window.innerWidth-50)/10))+1;
    let rdnTop=Math.ceil(Math.random()*Math.ceil((window.innerHeight-120)/10))+1;
    let newDiv= document.createElement('div');
    newDiv.classList.add('droppable');
    newDiv.classList.add('rectangle');
    newDiv.classList.add('eliminar');
    newDiv.style.backgroundColor = (count==MAXIMO&&'purple'||'red');
    newDiv.style.width=10+'px';
    newDiv.style.height=10+'px';
    newDiv.style.left=(10*rdnLeft)+'px';
    newDiv.style.top=(60+10*rdnTop)+'px';    
    body.appendChild(newDiv); 
}




//TEMAS
function ObtenerColor()
{  
    if(chCheck.checked)
    {
      return "white"
    }else{
    let red=Math.floor(Math.random()*256)-1;
    let green=Math.floor(Math.random()*256)-1;
    let blue=Math.floor(Math.random()*256)-1;
    return `rgb(${red},${green},${blue})`;
     // return `rgb(240,240,240)`//"gray"
    }
}

//ESCUCHAR TECLAS
function onKeyDownHandler(event) 
{ 
    if (isPushed) return;
    var codigo = event.which || event.keyCode;
    if((codigo === 40)&&(directions[direction]!='up')){
      direction=3;
    }else if((codigo === 38)&&(directions[direction]!='down')){
        direction=2;
    }else if((codigo === 37)&&(directions[direction]!='right')){
        direction=1;
    }else if((codigo === 39)&&(directions[direction]!='left')){
        direction=0;
    }   
    isPushed=true;
}

function onKeyDownHandlerMovil(event) 
{ 
    if (isPushed) return;

    if((event.target === btnDown)&&(directions[direction]!='up')){
      direction=3;
    }else if((event.target === btnUp)&&(directions[direction]!='down')){
        direction=2;
    }else if((event.target === btnLeft)&&(directions[direction]!='right')){
        direction=1;
    }else if((event.target === btnRigth)&&(directions[direction]!='left')){
        direction=0;
    }   
    isPushed=true;
}




