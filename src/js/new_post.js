const submit_video = async () => {

    const url = "http://52.149.198.157:80/videos-api/v1/videos"; 
    var video_title = document.getElementById("video_title").value;
    var video_description = document.getElementById("video_description").value;
    var video_path = document.getElementById("video_path").value;
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            if (response_json.msg == "ok") {
                window.location.href = 'feed.html';
            }
        }
    };


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader('Authorization', document.cookie);

    xhr.send(JSON.stringify({
        "video_title": video_title,
        "video_description": video_description,
        "video_path": video_path
    }));
}

