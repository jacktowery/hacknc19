var page = 0;
var event = [];

let titleO = document.querySelector("#event-title");
let datetimeO = document.querySelector("#event-datetime");
let locationO = document.querySelector("#event-location");
let imageO = document.querySelector("#event-image");

function showNextEvent() {

    page++;

    $.ajax({
        type: "GET",
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&page=' + page + '&apikey=DMXueEE9F1kCR0ww0sAazcHuCVmgcS69',
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