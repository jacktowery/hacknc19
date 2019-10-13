function processUserInfo() {
    var name = document.getElementById('user-name').value;
    var email = document.getElementById('user-email').value;
    var radius = document.getElementById('radiusSlider').value;

    console.log('name: ' + name);
    console.log('email: ' + email);
    console.log('radius: ' + radius);

    window.location.replace("app.html");
}