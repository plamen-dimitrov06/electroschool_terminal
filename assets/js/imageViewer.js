let showImage = function(grade) {
    image = document.getElementById('image-element');
    image.src = './assets/timetables/timetable-' + grade + '.png'; 
    document.getElementById('image-container').style.display = 'block';
}