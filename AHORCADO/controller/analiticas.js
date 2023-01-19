var user = JSON.parse(localStorage.getItem('usuario'));
const URL = "http://alu7203.arkania.es:8080/api/";
const tokenAPI ="iuwbefiugb4";
const idAPI = "003";



function getAnalitycs(){
    fetch(URL + "analytics.php?username="+user.username+"&password="+user.pass+"&app="+idAPI+"&token="+tokenAPI+"&query=analytics").then((response) => response.json())
    .then((json) => {
        console.log(json);
        switch (json.code) {
            case 200:
                
                
                //localStorage.setItem("analiticas",listaAnaliticas);
                localStorage.setItem("analiticas",JSON.stringify(json.object));
                break;
        
            default:
                console.log("errooooooooooooor")
                
                break;
        }
    });
}


function getTotalPoints(){
    fetch(URL + "analytics.php?username="+user.username+"&password="+user.pass+"&app="+idAPI+"&token="+tokenAPI+"&query=maxPoints").then((response) => response.json())
    .then((json) => {
        console.log(json);
        switch (json.code) {
            case 200:
                puntos = json.object;
                localStorage.setItem("puntos",puntos);
                break;
        
            default:
                console.log("errooooooooooooor")
                localStorage.setItem("puntos",0);
                break;
        }
    }); 
}

function ranking(){
    fetch(URL + "analytics.php?username="+user.username+"&password="+user.pass+"&app="+idAPI+"&token="+tokenAPI+"&query=ranking").then((response) => response.json())
    .then((json) => {
        console.log(json);
        switch (json.code) {
            case 200:
                localStorage.setItem("ranking",JSON.stringify(json.object));
                //console.log(json.object);
                break;
        
            default:
                console.log("errooooooooooooor");
                break;
        }
    }); 
}