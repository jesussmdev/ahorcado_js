function selectAll(){
  var listaPeliculas=[];
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET','../../resources/peliculas.json', true);
  xhttp.send();
  xhttp.onreadystatechange = function (){

    if(this.readyState == 4 && this.status == 200){
      
      let datos = JSON.parse(this.responseText);
      var i = 0;
      for (let peli in datos['Peliculas']) {
        var pelicula = new Pelicula(datos['Peliculas'][peli].Titulo,datos['Peliculas'][peli].Descripcion,datos['Peliculas'][peli].Actor,datos['Peliculas'][peli].Director,datos['Peliculas'][peli].Imagen,datos['Peliculas'][peli].Fecha,datos['Peliculas'][peli].Tipo);
        listaPeliculas.push(pelicula);
        
      }
      var index = obtenerPeliculaRandom(listaPeliculas);
      var peliculaSeleccionada = listaPeliculas[index];
      localStorage.setItem('pelicula', JSON.stringify(peliculaSeleccionada));
      obtenerPeliculasMultijugador(listaPeliculas);
      let indexJ1 = localStorage.getItem('pelicula_jugador_uno_indice');
      let indexJ2 = localStorage.getItem('pelicula_jugador_dos_indice');
      var peliculaJugador1 = listaPeliculas[indexJ1];
      var peliculaJugador2 = listaPeliculas[indexJ2];
      console.log(peliculaJugador1);
      console.log(peliculaJugador2);
      localStorage.setItem('peliculaJugador1', JSON.stringify(peliculaJugador1));
      localStorage.setItem('peliculaJugador2', JSON.stringify(peliculaJugador2));

      

    }
  }
  console.log(listaPeliculas);
}

function obtenerPeliculaRandom(array) {
  let index = Math.floor(Math.random() * array.length)
  return index;
}

function obtenerPeliculasMultijugador(array){
  var i = obtenerPeliculaRandom(array);
  localStorage.setItem('pelicula_jugador_uno_indice',i);
  var candidatas = false;
  while(candidatas!=true){
    var j = obtenerPeliculaRandom(array);
    if(i!=j){

      localStorage.setItem('pelicula_jugador_dos_indice',j);
      candidatas = true;
    }

  }


}

