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
        photo.src = el.path;

        cln.getElementsByClassName("photo__username")[0].innerHTML = el.user_info.email;
        cln.getElementsByClassName("photo__location")[0].innerHTML = el.title;
        cln.getElementsByClassName("photo__time-ago")[0].innerHTML = el.created_on;

        document.getElementById("feed").appendChild(cln);    
    }
    

} 