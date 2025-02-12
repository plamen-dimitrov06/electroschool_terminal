let showImage = function(grade) {
    image = document.getElementById('image-element');
    image.src = '../assets/timetables/timetable-' + grade + '.png';
    document.getElementById('image-container').style.display = 'block';
    gtag('event', 'timetable_modal');
}
let showFloor = function(floor) {
    image = document.getElementById('image-element');
    image.src = './assets/floors/' + floor + '_floor.png';
    document.getElementById('image-container').style.display = 'block';
}
