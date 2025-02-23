document.addEventListener("DOMContentLoaded", function () {
    // Ensure body is always visible
    gsap.set("body", { opacity: 1 });

    // Fade-in effect on load
    gsap.from("body", { opacity: 0, duration: 0.3, ease: "power2.out" });

    document.querySelectorAll("a").forEach(link => {
        const linkHref = link.href;
        const siteOrigin = window.location.origin;

        if (linkHref.startsWith(siteOrigin)) {
            link.addEventListener("click", function (e) {
                e.preventDefault(); // Prevent default link navigation

                // Fetch the new page **in the background** first
                fetch(linkHref)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, "text/html");

                        // Store the new page content
                        const newContent = doc.body.innerHTML;

                        // **Now** fade out smoothly
                        gsap.to("body", {
                            opacity: 0,
                            duration: 0.2,
                            ease: "power2.in",
                            onComplete: () => {
                                document.body.innerHTML = newContent; // Swap in new content
                                window.history.pushState({}, "", linkHref); // Update URL

                                // 🚀 **Force Reset Opacity Immediately**
                                gsap.set("body", { opacity: 1 });

                                // **Re-run script after swap**
                                document.dispatchEvent(new Event("DOMContentLoaded"));

                                // Fade-in the new page
                                gsap.from("body", { opacity: 0, duration: 0.3, ease: "power2.out" });
                            }
                        });
                    });
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", lastfm)

function addContainer(trackName, data) {
    let container = document.createElement("div");
    container.classList.add("container");

    let textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");
    imageDiv.style.backgroundImage = `url(${data.image[2]['#text']})`;

    let lastfm = document.createElement("p");
    lastfm.classList.add("lastfm-text");

    let currently = document.createElement("p");
    currently.classList.add("currently-playing");
    if (data['@attr'] && data['@attr'].nowplaying) {
        currently.appendChild(document.createTextNode("currently playing..."));
    } else {
        currently.appendChild(document.createTextNode("last played:"));
    }

    lastfm.appendChild(document.createTextNode(trackName));
    lastfm.appendChild(document.createElement("br"));
    lastfm.appendChild(document.createTextNode(`${data.artist['#text']} | ${data.album['#text']}`));

    container.appendChild(imageDiv);
    textContainer.appendChild(currently);
    textContainer.appendChild(lastfm);
    container.appendChild(textContainer);
    document.getElementById("lastfm-container").appendChild(container);
}

async function lastfm() {
    try {
        const response = await fetch('/api/lastfm');
        const data = await response.json();

        const trackName = data.name?.split('(feat. ')[0] || 'error';

        const existingContainer = document.querySelector(".container");
        const trackMatches = existingContainer?.querySelector('.lastfm-text')?.textContent.includes(trackName);

        if (existingContainer && !trackMatches) {
            existingContainer.remove();
            addContainer(trackName, data);
        } else if (!existingContainer) {
            addContainer(trackName, data);
        }
    } catch (error) {
        console.error("error: ", error);
    }

    setTimeout(lastfm, 3 * 1000); // 3 seconds
}