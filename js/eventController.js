var page = 0;
var event = [];

var currentTitle = "";
var currentURL = "";
var savedEvents = [];

let eventContainer = document.querySelector("#event-container");
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

//console.log('name: ' + userName);
//console.log('email: ' + userEmail);
//console.log('radius: ' + radius);

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
    showNextEvent();
    //coordsDisplay.innerText = "Coordinates: (" + latPos + ", " + longPos + ")";
    //document.querySelector('#lat').value = latPos;
    //document.querySelector('#long').value = longPos;
}

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
            var rawDate = event.dates.start.localDate;
            var rawTime = event.dates.start.localTime;
            var date = new Date(rawDate);
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            datetimeO.innerHTML = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            datetimeO.innerHTML += ' - ' + rawTime;

            //datetimeO.innerHTML = event.dates.start.localDate + " " + event.dates.start.localTime;
            locationO.innerHTML = event._embedded.venues[0].name;
            imageO.setAttribute("src", event.images[0].url);

            currentTitle = event.name;
            currentURL = event.url;

            eventContainer.style.transform = 'translateX(0px)';
            setTimeout(eventFadeIn, 300);
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });

}

function like() {
    savedEvents.push([currentTitle, currentURL]);
    eventRight();
    eventFadeOut();
    setTimeout(showNextEvent, 1000);
    //eventFadeIn();
    //save to profile
}

function dislike() {
    eventLeft();
    eventFadeOut();
    setTimeout(showNextEvent, 1000);
    //eventFadeIn();
}

function eventFadeOut() {
    eventContainer.style.opacity = "0";
}

function eventFadeIn() {
    eventContainer.style.opacity = "1";
}

function eventLeft() {
    eventContainer.style.transform = 'translateX(-200px)';
}

function eventRight() {
    eventContainer.style.transform = 'translateX(200px)';
}

function sendEmail() {
    if (savedEvents.length > 0) {
        var emailBody = "";
        for (var i = 0; i < savedEvents.length; i++) {
            emailBody += '<p><strong>' + savedEvents[i][0] + '</strong>:</p>';
            emailBody += '<p>' + savedEvents[i][1] + '</p><br>';
        }


        var template_params = {
            "to_email": userEmail,
            "to_name": userName,
            "message_html": emailBody
        }

        var service_id = "default_service";
        var template_id = "vent_event_list";
        emailjs.send(service_id, template_id, template_params);

        //show modal
        let modal = document.getElementById('email-modal');
        modal.classList = "modal is-active";

        savedEvents = [];
    } else {
        alert("You have not saved any events yet!");
    }
}

$("#event-container").on("swiperight", like);
$("#event-container").on("swipeleft", dislike);

getLocation();