//buscador
const input=document.querySelector('.buscador-input');
const btnBuscador=document.querySelector('.buscador-btn');
const er=document.querySelector(".error");
const tarjeta=document.querySelector(".tarjeta");
const divNombre=document.querySelector(".header");
const divImagen=document.querySelector(".imagen");
const divStats=document.querySelector(".stats");
const divType=document.querySelector(".type");
const url='https://pokeapi.co/api/v2/pokemon/';
var nombre;

const coloresTipos = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy:'#d58bdf',
    default: '#2A1A1F',
};
//consultamos info de la api
function consulta(url,nombre){
    fetch(url+nombre)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        gestionInfo(data);
    }).catch(err =>error());
        
}

function gestionInfo(data){
    //console.log(data.name);
    
    setTimeout(function () {
        
        getName(data);
        getSprite(data.sprites.front_default);
        getStats(data.stats);
        getType(data.types);
        tarjeta.style.display="grid";
        er.style.display="none";   
    }, 1000);

}

function error(){
    er.style.display="block";
    tarjeta.style.display="none";
}

function getName(data){
   
    divNombre.textContent=`${data.name.toUpperCase()}   ID: ${data.id}`;
   
}
function getSprite(data){
    
    divImagen.innerHTML=`<img src="${data}">`;
}
function getStats(data){
    divStats.innerHTML=`<div class="hp">Hp= ${data[0].base_stat}</div>
                        <div class="atk">Atk=${data[1].base_stat}</div>
                        <div class="def">Def=${data[2].base_stat}</div>
                        <div class="satk">S.Atk=${data[3].base_stat}</div>
                        <div class="sdef">S.Def=${data[4].base_stat}</div>
                        <div class="speed">Speed=${data[5].base_stat}</div>`;
}
function getType(data){
    let tipos=data.map(item => item.type.name);
    
    let color1=coloresTipos[tipos[0]];
    let color2 = tipos[1] ? coloresTipos[tipos[1]] : coloresTipos.default;
    
    
    if(tipos.length>=2){
        divType.innerHTML=`<div id='div1'>${tipos[0]}</div><div id='div2'>${tipos[1]}</div>`;
        const div1=document.getElementById('div1');
        const div2=document.getElementById('div2');
        div1.style.background=color1;
        div2.style.background=color2;
    }else{divType.innerHTML=`<div id='div1'>${tipos[0]}</div>`;
        const div1=document.getElementById('div1');
        div1.style.background=color1;
    }

    
    
}
//eventos del buscador
btnBuscador.addEventListener('click',function(e){
    e.preventDefault();
    nombre=input.value.toLowerCase();
//impedimos que busquen sin ingresar valores
    if(nombre==""){console.log("cadena vacia");
    }else{consulta(url,nombre);}
    
    
   
    
});