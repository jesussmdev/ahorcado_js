const URL = "http://alu7203.arkania.es:8080/api/";

function register(){
    let nombre = document.getElementById('nombre').value;
    let apellido1 = document.getElementById('apellido1').value;
    let apellido2 = document.getElementById('apellido2').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('usuario').value;
    let pass = document.getElementById('password').value;
    let repetir = document.getElementById('repetir').value;
    fetch(URL + "registro.php?nombre="+nombre+"&apellido1="+apellido1+"&apellido2="+apellido2+"&email="+email+"&usuario="+username+"&password="+pass+"&repetir="+repetir).then((response) => response.json())
    .then((json) => {
        console.log(json);
        switch (json.code) {
            case 200:
                window.location.href = "../view/home.html";
                
                break;
        
            default:
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").textContent = json.message;
                break;
        }
    });
}
