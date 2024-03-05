document.addEventListener('DOMContentLoaded', function() {
    var currentTime = new Date().getHours();
    var greetings = '';
    var presentation = document.getElementById("presentation");

    if (currentTime>=12 && currentTime<18){
        greetings = 'GA!';
    } else if(currentTime>=18 && currentTime<5){
        greetings = 'GN!';
    } else{
        greetings = 'GM!';
    }

    presentation.innerHTML = greetings + ' ' + presentation.innerHTML;

});