
const get_me_search_results = async () => {
    const url = "http://52.149.198.157:80/search-api/v1/search?q=" + localStorage.getItem("search_term"); 
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            populateSearch(response_json["content"]);
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
get_me_search_results();


function search(ele) {
    if(event.key === 'Enter') {
		localStorage.setItem("search_term", ele.value);
        window.location.href = "search.html";
    }
}


function populateSearch(search_results){
    var parent = document.getElementById("feed");
    console.log(parent);
	console.log(search_results);
    for (search_result of search_results){
    	var res = itm.cloneNode(true);
    	res.style.display = "inline";
    	res.children[0].children[1].id = search_result.user_id;
    	console.log(res);
    	res.children[0].children[0].innerText = search_result.email + ", Followers: " + search_result.n_followers;
    	parent.appendChild(res);
    }

}

function follow(event){
	const id = event.srcElement.id;
	
	const url = "http://52.149.198.157:80/users-api/v1/follow/" + id; // site that doesn’t send Access-Control-*
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            let response_json = JSON.parse(this.responseText);
            console.log(response_json);
            if (response_json.msg == "ok") {
            	console.log(id);
            	document.getElementById(id).style.visibility = "hidden";
            }
        }
    };


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader('Authorization', document.cookie);

    xhr.send();
}