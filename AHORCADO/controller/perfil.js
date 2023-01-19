var user = JSON.parse(localStorage.getItem('usuario'));
var aciertosTotales = 0;
var intentosTotales = 0;

var contenedor = document.getElementById('canvasbody');
getTotalPoints();
console.log(puntos);
getAnalitycs();
ranking();
var puntos = localStorage.getItem("puntos");

var analiticas = JSON.parse(localStorage.getItem("analiticas"));
analiticas = analiticas.reverse();
console.log(analiticas);
var listaAnaliticas =[];


for (let i = 0; i < analiticas.length; i++) {
    
    let analitica = new Partida(analiticas[i].victory,analiticas[i].time,analiticas[i].intentos,analiticas[i].aciertos,analiticas[i].puntos)
    aciertosTotales+= analitica.aciertos;
    intentosTotales+=analitica.intentos;
    listaAnaliticas.push(analitica);
    let estadoPartida = "";
    if(analiticas[i].victory){
        estadoPartida = "VICTORIA"
    }else{
        estadoPartida = "DERROTA"
    }
    contenedor.innerHTML +=`
    <div class="card">
        <div id="fecha_car" class="card-header ${estadoPartida}">
          Fecha ${analiticas[i].time}
        </div>
        <div  class="card-body ${estadoPartida}-body">
          <blockquote class="blockquote mb-0">
            <p>Intentos: ${analiticas[i].intentos} </p>
            <p>Aciertos: ${analiticas[i].aciertos} </p>
            <p>Puntos: ${analiticas[i].puntos} </p>
            <footer class="blockquote-footer">Partida acabada con <cite title="estado partida">${estadoPartida}</cite></footer>
          </blockquote>
        </div>
      </div>
      <br>
    `
    //contenedor.outerHTML += "<div class='card'> <div class='card-header'>Fecha</div> <div class='card-body'> <blockquote class='blockquote mb-0'> <p>Una cita conocida, contenida en un elemento blockquote.</p> <footer class='blockquote-footer'>Alguien famoso en <cite title='Título de la fuente'>Título de la fuente</cite></footer> </blockquote> </div> </div>"
}
console.log(listaAnaliticas);



document.getElementById('usuarioUser').textContent += user.username;
document.getElementById('nombre_user').textContent += user.nombre;
document.getElementById('apellido1User').textContent += user.apellido1;
document.getElementById('apellido2User').textContent += user.apellido2;
document.getElementById('emailUser').textContent += user.email;

document.getElementById('partidasTotalesUser').textContent += listaAnaliticas.length;
document.getElementById('IntentosTotalesUser').textContent += intentosTotales;
document.getElementById('AciertosTotalesUser').textContent += aciertosTotales;
document.getElementById('puntosTotalesUser').textContent += puntos;











