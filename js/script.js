document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch('/api/lastfm');
    const data = await response.json();

    let container = document.createElement("div");
    container.classList.add("container");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");

    imageDiv.style.backgroundImage = `url(${data.image[3]['#text']})`;

    let currently = document.createElement("p");
    currently.classList.add("currently-playing");
    currently.text = "currently playing..."

    let lastfm = document.createElement("p");
    lastfm.classList.add("lastfm-text");

    lastfm.appendChild(document.createTextNode(`${data.name}`));
    lastfm.appendChild(document.createElement("br"));
    lastfm.appendChild(document.createTextNode(`${data.artist['#text']} | ${data.album['#text']}`));

    container.appendChild(currently);
    container.appendChild(imageDiv);
    container.appendChild(lastfm);
    document.body.appendChild(container);

});