const URL = "http://alu7203.arkania.es:8080/api/";

function login(){
    let username = document.getElementById('username').value;
    let pass = document.getElementById('pass').value;
    fetch(URL + "login.php?username="+username+"&password="+pass).then((response) => response.json())
    .then((json) => {
        console.log(json);
        switch (json.code) {
            case 200:
                console.log(json.object.usuario);
                var usuario = new Usuario(json.object.nombre,json.object.apellido1,json.object.apellido2,json.object.email,json.object.usuario,pass);
                localStorage.setItem('usuario', JSON.stringify(usuario));
                window.location.href = "../view/home.html";
                break;
        
            default:
                document.getElementById("error").style.visibility = "visible";
                break;
        }
    });
}