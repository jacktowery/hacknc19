function processUserInfo() {
    var name = document.getElementById('user-name').value;
    var email = document.getElementById('user-email').value;
    var radius = document.getElementById('radiusSlider').value;

    //console.log('name: ' + name);
    //console.log('email: ' + email);
    //console.log('radius: ' + radius);

    // SET COOKIES
    Cookies.set('name', name);
    Cookies.set('email', email);
    Cookies.set('radius', radius);

    //document.cookie = "name=" + name + "; email=" + email + "; radius=" + radius;

    // REDIRECT
    window.location.replace("app.html");
}