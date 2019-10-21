$(document).ready(function () {
//questions array
var questions = [
    {
        question: "Which player transfered from Bayern Munich to Real Madrid?",
        choices: ["Jovic", "Danilo", "Varane", "Kroos"],
        answer: 3,
        pic: "./images/kroos.jpg"
    },
    {
        question: "Which player was the first to win a Balllon D'Or following the reign of Messi and Ronaldo?",
        choices: ["Hazard", "Neymar", "Modric", "Neuer"],
        answer: 2,
        pic: "./images/modric.jpg"
    },
    {
        question: "Who is the greatest player of all time?",
        choices: ["Cristiano Ronaldo", "Zidane", "Maradona", "Ronaldo"],
        answer: 0,
        pic: "./images/ronaldo.jpg"
    },
    {
        question: "Who scored the famous tying goal in Real Madrid's La Decima Campaign?",
        choices: ["Di Maria", "Casemiro", "Ramos", "Carvajal"],
        answer: 2,
        pic: "./images/ramos.jpg"
    },
    {
        question: "Who is the second coming of Roberto Carlos, but with hair?",
        choices: ["Marcelo", "Bale", "Navas", "Modric"],
        answer: 0,
        pic: "./images/marcelo.jpg"
    }];
// vars
var timer = 20;
var guess = "";
var correct = 0;
var wrong = 0;
var unanswered = 0;
var theInterval;
var timerRunning = false;
var choice;
var randomQ;
var picArray = [];
var holderArray = [];
var questionL = questions.length;
// hide play again button
$("#playAgain").hide();
// start button function
$("#start").on("click", function() {
    $("#start").hide();
    showQuestion();
    startTimer();
    for (i = 0; i < questions.length; i++) {
        holderArray.push(questions[i]);
    }
});
//start timer function
function startTimer() {
    if (!timerRunning) {
        theInterval = setInterval(decrement, 1000);
        timerRunning = true;
    };
};
//decrement timer function
function decrement() {
    $("#timer").html("<h2>Time left: " + timer + "</h2>");
    timer --;
    if (timer === 0) {
        unanswered++;
        stop();
        $("#answers").html("<p>Time's up! The correct answer was: " + choice.choices[choice.answer] + "</p>");
        hidePic();
    };
};
//stop timer function
function stop() {
    timerRunning = false;
    clearInterval(theInterval);
};
//random question/show answers functions
function showQuestion() {
    randomQ = Math.floor(Math.random()*questions.length);
    choice = questions[randomQ];
    $("#question").html("<h2>" + choice.question + "</h2>");
    for (var i = 0; i < choice.choices.length; i++) {
        var playerChoice = $("<div>");
        playerChoice.addClass("answerChoice");
        playerChoice.html(choice.choices[i]);
        playerChoice.attr("data-guess", i);
        $("#answers").append(playerChoice);
    };
};
//onclick function for answers
$(".answerChoice").on("click", function() {
    guess = parseInt($(this).attr("data-guess"));
    if (guess === choice.answer) {
        stop();
        correct ++;
        guess = "";
        $("#answers").html("<p>Correct!</p>");
        hidePic();
    } else {
        stop();
        wrong ++;
        guess = "";
        $("#answers").html("<p>Incorrect! The correct answer was: " + choice.choices[choice.answer] + "</p>");
        hidePic();
    };
});
//picture function
function hidePic() {
    $("#answers").append("<img src=" + choice.photo + ">");
    picArray.push(choice);
    questions.splice(randomQ, 1);
    var picHide = setTimeout(function() {
        $("#answers").empty();
        timer = 20;
    if ((wrong + correct + unanswered) === questionL) {
        $("#question").empty();
        $("#question").html("<h2>Game Over! Results: </h2>");
        $("#answers").append("<h3> Correct: " + correct + "</h3>");
        $("#answers").append("<h3> Incorrect: " + wrong + "</h3>");
        $("#answers").append("<h3> Unanswered: " + unanswered + "</h3>");
        $("#playAgain").show();
        correct = 0;
        wrong = 0;
        unanswered = 0;
    } else {
        startTimer();
        showQuestion();
    };
    }, 3000);
};
//play again function
$("#playAgain").on("click", function() {
    $("#playAgain").hide();
    $("#answers").empty();
    $("#question").empty();
    for (var i = 0; i < holderArray.length; i++) {
        questions.push(holderArray[i]);
    };
    startTimer();
    showQuestion();
});


});

