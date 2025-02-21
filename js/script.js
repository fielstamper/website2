document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch('/api/lastfm');
    const data = await response.json();

    let container = document.createElement("div");
    container.classList.add("container");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");

    imageDiv.style.backgroundImage = `url(${data.image[2]['#text']})`;

    let currently = document.createElement("p");
    currently.classList.add("currently-playing");
    if (data['@attr'] && data['@attr'].nowplaying) {
        currently.appendChild(document.createTextNode("currently playing..."));
    } else {
        currently.appendChild(document.createTextNode("last played:"));
    }

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