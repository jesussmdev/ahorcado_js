var user = JSON.parse(localStorage.getItem('usuario'));
ranking();
var ranking = JSON.parse(localStorage.getItem("ranking"));
var result = [];
var usuarios = [];
var puntos =[];
var puntos_usuarios = [];
console.log(ranking);
for (var key in ranking) {
    result.push([key,ranking[key]]);

    console.log(ranking);
}
console.log(result);

for (let i = 0; i < result.length; i++) {
    usuarios.push(result[i][0]);
    puntos.push(result[i][1].maxPoints);
    var row = new Array();
    row["0"] = puntos[i];
    row["1"] = usuarios[i];

    puntos_usuarios.push(row);
}

puntos_usuarios.sort(
    function(a,b){
    if(a[0] < b[0])return -1;
    if(a[0] > b[0])return 1;
    return 0;
    });
puntos_usuarios=  puntos_usuarios.reverse();
console.log(puntos_usuarios);


var contenedor = document.getElementById('contenido');

for (let i = 0; i < puntos_usuarios.length; i++) {
    contenedor.innerHTML +=`
    <tr class="puesto-${i+1}">
                        <th scope="row">${i+1}</th>
                        <td>${puntos_usuarios[i][1]}</td>
                        <td>${puntos_usuarios[i][0]}</td>
    </tr>

    `
    //contenedor.outerHTML += "<div class='card'> <div class='card-header'>Fecha</div> <div class='card-body'> <blockquote class='blockquote mb-0'> <p>Una cita conocida, contenida en un elemento blockquote.</p> <footer class='blockquote-footer'>Alguien famoso en <cite title='Título de la fuente'>Título de la fuente</cite></footer> </blockquote> </div> </div>"
}



