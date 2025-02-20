document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch('/api/lastfm');
    const data = await response.json();

    let container = document.createElement("div");
    container.classList.add("container");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");

    imageDiv.style.backgroundImage = `url(${data.image[3]['#text']})`;
    container.appendChild(imageDiv);

    let lastfm = document.createElement("p");
    lastfm.classList.add("lastfm-text");

    lastfm.appendChild(document.createTextNode(`${data.name}`));
    lastfm.appendChild(document.createElement("br"));
    lastfm.appendChild(document.createTextNode(`${data.artist['#text']} | ${data.album['#text']}`));

    container.appendChild(lastfm);
    document.body.appendChild(container);
});