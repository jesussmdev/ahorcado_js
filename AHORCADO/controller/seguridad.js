var user = JSON.parse(localStorage.getItem('usuario'));
if(user==null){
    window.location.href = "../view/login.html";

}else{
    console.log("sesion iniciada ")
    console.log(user)
    document.getElementById('nombreUser').textContent = user.username;
}