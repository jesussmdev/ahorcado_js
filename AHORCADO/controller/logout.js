function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem("analiticas");
    localStorage.removeItem("puntos");
    localStorage.removeItem("ranking");
    
    window.location.href = "../view/login.html";
    
}