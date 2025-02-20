document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch('/api/lastfm');
    const jsonResponse = await response.json();
    const data = jsonResponse['data'];

    let container = document.createElement("div");
    container.classList.add("container");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");

    imageDiv.style.backgroundImage = `url(${jsonResponse.image})`;

    let currently = document.createElement("p");
    currently.classList.add("currently-playing");
    currently.appendChild(document.createTextNode("currently playing..."));

    let lastfm = document.createElement("p");
    lastfm.classList.add("lastfm-text");

    const trackname = data.name.split('(feat. ')[0]

    lastfm.appendChild(document.createTextNode(trackname));
    lastfm.appendChild(document.createElement("br"));
    lastfm.appendChild(document.createTextNode(`${data.artist['#text']} | ${data.album['#text']}`));

    container.appendChild(currently);
    container.appendChild(imageDiv);
    container.appendChild(lastfm);
    document.body.appendChild(container);

});