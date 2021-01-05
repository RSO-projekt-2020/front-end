$(document).ready(function(){
    // Here we put all the code
    var heart = $('.heart'),
        cog = $('#cog'),
        popUp = $('.popUp'),
        closePopUp = $('#closePopUp'),
        cancelPopUp = $('#cancelPopUp');

    heart.click(function(){
        $(this).toggleClass('fa-heart-o');
        $(this).toggleClass('heart-red fa-heart');
    })

    cog.click(function(){
        popUp.fadeIn(500);
    })

    closePopUp.click(function(){
        popUp.fadeOut(500);
    })

    cancelPopUp.click(function(){
        popUp.slideUp(500)
    })

    


})




const log_me_in = async () => {
    const url = "http://52.149.198.157:80/users-api/v1/user"; // site that doesn’t send Access-Control-*
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            if (response_json.msg == "Login successful") {
                document.cookie = response_json.token;
                window.location.href = 'feed.html';
            }
        }
    };


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify({
        "email": email,
        "password": password
    }));
}

const register = async () => {

    const url = "http://52.149.198.157:80/users-api/v1/register"; 
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        console.log("SMO TOLE");
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            console.log("asdasdsad");
            if (response_json.msg == "Created new user.") {
                document.cookie = response_json.token;
                window.location.href = 'feed.html';
            }
        }
    };


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify({
        "email": email,
        "password": password
    }));
}

