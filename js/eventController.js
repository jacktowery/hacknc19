var page = 0;
var event = [];

let titleO = document.querySelector("#event-title");
let datetimeO = document.querySelector("#event-datetime");
let locationO = document.querySelector("#event-location");
let imageO = document.querySelector("#event-image");

let modalName = document.querySelector('#load-name');

var userName = Cookies.get('name');
var userEmail = Cookies.get('email');
var radius = Cookies.get('radius');
modalName.innerHTML = userName;

// default lat/long values in case user does not allow location
var latitude = 35.9030784;
var longitude = -79.05279999999999;

console.log('name: ' + userName);
console.log('email: ' + userEmail);
console.log('radius: ' + radius);

// GET LOCATION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}

function showLocation(whereAmI) {
    let latPos = whereAmI.coords.latitude;
    let longPos = whereAmI.coords.longitude;
    console.log(latPos + ", " + longPos);
    latitude = latPos;
    longitude = longPos;
    //coordsDisplay.innerText = "Coordinates: (" + latPos + ", " + longPos + ")";
    //document.querySelector('#lat').value = latPos;
    //document.querySelector('#long').value = longPos;
}

setTimeout(function () {
    getLocation();
}, 500);


// QUERY API
function showNextEvent() {

    page++;

    $.ajax({
        type: "GET",
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&page=' + page + '&geoPoint=' + latitude + ',' + longitude + '&radius=' + radius + '&unit=miles&apikey=DMXueEE9F1kCR0ww0sAazcHuCVmgcS69',
        async: true,
        dataType: "json",
        success: function (json) {
            //console.log('just got a new event');
            // Parse the response.
            // Do other things.
            event = json._embedded.events[0];
            console.log('page number = ' + page);
            console.log(event);

            titleO.innerHTML = event.name;
            datetimeO.innerHTML = event.dates.start.localDate + " " + event.dates.start.localTime;
            locationO.innerHTML = event._embedded.venues[0].name;
            imageO.setAttribute("src", event.images[0].url);
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });

}

function like() {
    showNextEvent()
    //save to profile
}

function dislike() {
    showNextEvent();
}

showNextEvent();