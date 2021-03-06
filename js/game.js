var score = 0;

function showResult(result, msg) {
    $('.result .card .score').html(`Score : ${result}`);
    $('.result .card .message').html(`${msg}`);
    $('.result').addClass('show');
}

function gameStart() {

    //User Score
    score = 0;  //points
    let intervalID = 0;

    // Reset
    $('.play .row .block').removeClass('wrong');
    $('.play .row .block').removeClass('correct');

    // Game starting params
    var id = Math.floor(Math.random() * 32) + 1;
    $(`.play .row #${id}`).addClass('correct');
    let timeoutBlockID = id;
    let timeoutID = setTimeout(timeout, 5000);   //Initial timeout is set to 5 seconds
    progress(5000);


    // varify click
    function compare(blockID) {
        if(blockID === id) {
            // +1 points for matched block            
            score++;

            // setting new block
            $('.play .row .block').removeClass('correct');
            id = Math.floor(Math.random() * 32) + 1;
            $(`.play .row #${id}`).addClass('correct');

            timeoutBlockID = id;

            // setting Timeout according to score
            if(score < 2) {
                timeoutID = setTimeout(timeout, 4000);   //timelimit = 4sec when score = 1 
                progress(4000);
            } else if(score < 3) {
                timeoutID = setTimeout(timeout, 3000);   //timelimit = 3sec when score = 2
                progress(3000);
            } else if(score < 6) {
                timeoutID = setTimeout(timeout, 2000);   //timelimit = 2sec when score = 3, 4, 5
                progress(2000);
            } else if(score < 11) {
                timeoutID = setTimeout(timeout, 1000);   //timelimit = 1sec when score = 6, 7, 8, 9, 10
                progress(1000);
            } else if(score < 16) {
                timeoutID = setTimeout(timeout, 800);   //timelimit = 0.8sec when score = 11, 12, 13, 14, 15
                progress(800);
            } else if(score < 25) {
                timeoutID = setTimeout(timeout, 700);   //timelimit = 0.7sec when score = from 16 to 24
                progress(700);
            } else if(score < 50) {
                timeoutID = setTimeout(timeout, 600);   //timelimit = 0.6sec when score = from 25 to 49
                progress(600);
            } else {
                timeoutID = setTimeout(timeout, 500);   //timelimit = 0.5sec when score = greater than 49
                progress(500);
            }
        } else {
            showResult(score, 'Catch Missed!');
            $(`.play .row #${blockID}`).addClass('wrong');
            console.log('NOT Matched !  GAME OVER...');
        }
    }

    //End Game when Timeout
    function timeout() {
        showResult(score, 'TimeOut!');
        $('.play .row .block').removeClass('correct');
        $(`.play .row #${timeoutBlockID}`).addClass('wrong');
        console.log('TIME OUT !  GAME OVER...');
    }

    // Progress of remaining time
    function progress(time) {
        let width = 100;
        intervalID = setInterval(move, time/200);
        function move() {
            if(width <= 0) {
                clearInterval(intervalID);
            } else {
                width -= .5;
                $('.play .progress .current').css('width', `${width}%`);
            }
        }
    }

    // Handle click events
    $('.play .row .block').click(function(){
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        let clickedID = $(this).attr('id');
        compare(parseInt(clickedID, 10));
    });
}

function countdown() {
    let count = 4;
    let text = '';
    $('.countdown .count').css('font-size', '0');
    let intervalID = setInterval(go, 1000);
    function go() {
        if(count <= 0) {
            clearInterval(intervalID);
            $('.countdown .count').html('');
            $('.countdown').addClass('hide');
            gameStart();
        } else {
            count--;
            if(count == 0) {
                text = 'GO!';
            } else {
                text = `${count}`;
            }
            $('.countdown .count').html(text).animate({fontSize: '8rem'},500);
            $('.countdown .count').animate({fontSize: '0'},500);
        }
    }
}

$('.result .card .buttons .block .retry').click(function(){
    location.reload(true);
    // document.documentElement.requestFullscreen();
    // document.body.requestFullscreen();
});

$('.result .card .buttons .block .quit').click(function(){
    let url = "index.html";
    window.location.href = url; 
});

$(document).ready(function(){
    // document.documentElement.requestFullscreen();
    // document.body.requestFullscreen();
    countdown();
});