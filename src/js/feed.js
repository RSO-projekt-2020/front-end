const get_me_feed = async () => {
    const url = "http://52.149.198.157:80/feed-api/v1/feed"; // site that doesn’t send Access-Control-*
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            populate_feed(response_json["feed"]);
        }
    };


    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', document.cookie);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send();
}

var itm = document.getElementById("photo");
itm.style.display = "none";


get_me_feed();


function populate_feed(feed){
    console.log(feed);
    var itm = document.getElementById("photo");
    itm.style.display = "none";


    for (const el of feed){
        console.log(el);
        var cln = itm.cloneNode(true);
        cln.style.display = "inline";
        cln.getElementsByClassName("photo__file")[0].src = el.path;

        var photo_comments = cln.getElementsByClassName("photo__comments")[0];
        
        var comment = cln.getElementsByClassName("photo__comment_to_hide")[0];
        comment.style.display = "none";
        
        photo.src = el.path;

        cln.getElementsByClassName("photo__username")[0].innerHTML = el.user_info.email;
        cln.getElementsByClassName("photo__location")[0].innerHTML = el.title;
        cln.getElementsByClassName("photo__time-ago")[0].innerHTML = el.created_on;

        for (const el1 of el.comments){
            comment.style.display = "inline";
            comment.innerHTML = '<div style="padding-top:5px; padding-bottom:5px"><span style="font-weight: bold">' + el1.user_info.email + ": </span>" + el1.comment + "</div>";
            photo_comments.insertBefore(comment, cln.getElementsByClassName("photo__comment")[0]);
            comment = comment.cloneNode(true);
        }

        cln.id = el.video_id;
        document.getElementById("feed").appendChild(cln);   
    }
    

} 

function submit_comment(event){
    video_id = event.srcElement.parentNode.parentNode.parentNode.parentNode.id;
    console.log(event);
    var comment = event.srcElement.previousSibling.previousSibling.value;
    if (comment === ""){
        return
    }

    const url = "http://52.149.198.157:80/videos-api/v1/videos/" + video_id + "/comments";

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            window.location.href = 'feed.html';
        }
    };


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', document.cookie);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.send(JSON.stringify({
        "comment": comment
    }));
}


function logout(){
    document.cookie = "";
}