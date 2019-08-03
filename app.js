window.onload = function () {
    document.getElementById('search').addEventListener('click', showResults);
}

const outputWiki = document.getElementById('outputWiki');
const outputYoutube = document.getElementById('outputYoutube');

function showResults() {
    const searchTerm = document.querySelector('input[name="searchTerm"]').value;
    
    // Wikipedia
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${searchTerm}&utf8=1`;
    outputWiki.innerHTML = `<h2>Search Term: ${searchTerm}</h2>`
    ajaxJS(url, function (response) {
        response.forEach(el => {
            const holder = (typeof el == 'string') ? el : el[0];
            outputWiki.innerHTML += `<div class="dataOutput">${holder}</div>`;
        })
    })
    
    // YouTube
    const APIkeyYouTube = 'my key';
    const url1 = `https://www.googleapis.com/youtube/v3/search/?part=snippet&key=${APIkeyYouTube}&q=${searchTerm}&maxResults=10`;
    outputYoutube.innerHTML = `<h2>Video Search: ${searchTerm}</h2>`
    
    ajaxJS(url1, function(data) {
        data.items.forEach(el => {
            console.log(el);
            const title = el.snippet.title;
            const desc = el.snippet.description;
            const thumb = el.snippet.thumbnails.default.url;
            const videoID = el.id.videoId
            outputYoutube.innerHTML += `<div class="panel"><div class="wrap"><div class="content"><span>${title}</span></div><a href="https://youtu.be/${videoID}" target="_blank"><img src="${thumb}" alt="${title}"></a></div></div>`;
        })
    })
}

function ajaxJS(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}
