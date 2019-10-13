function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(closeModal, 2000);
});

function closeModal() {
    let modal = document.getElementById('loading-modal');
    modal.classList = "modal";
}

function closeEmailModal() {
    let modal = document.getElementById('email-modal');
    modal.classList = "modal";
}