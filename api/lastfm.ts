let lastUpdate = 0;
let cachedResponse: object | undefined;

export async function GET(request: Request) {
    const now = Date.now();
    const waitMs: number = 10 * 1000;

    if (!cachedResponse) {
        // If there's no cached response, fetch it immediately
        const data = await fetchRecentTrack();

        cachedResponse = {
            image: data['image'][2]['#text'],
            data: data
        }

        imageToBase64(data['image'][2]['#text']).then(base64 => {
            if (base64) {
                cachedResponse = {
                    image: base64,
                    data: data
                }
            }
        });
        lastUpdate = now;
    } else if (now - lastUpdate >= waitMs) {
        // If cache is expired, trigger async update but return immediately
        lastUpdate = now;
        fetchRecentTrack().then(response => {
            if (cachedResponse!['data']['name'] !== response['name']) {
                const data = response['data']
                cachedResponse = {
                    image: data['image'][2]['#text'],
                    data: data
                }

                imageToBase64(data['image'][2]['#text']).then(base64 => {
                    if (base64) {
                        cachedResponse = {
                            image: base64,
                            data: data
                        }
                    }
                });
            }
        });
    }

    return Response.json(cachedResponse);
}

async function imageToBase64(imageUrl: string): Promise<string | null> {
    try {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        const mimeType = response.headers.get("content-type") || "image/png";

        return `data:${mimeType};base64,${base64String}`;
    } catch (error) {
        console.error("Error converting image to Base64:", error);
        return null;
    }
}


async function fetchRecentTrack(): Promise<object> {
    const params = new URLSearchParams({
        method: "user.getrecenttracks",
        limit: "1",
        user: "swagster736",
        api_key: "f882cdfc41488cde6404236b20bb0095",
        format: "json"
    });

    const url = `https://ws.audioscrobbler.com/2.0/?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.recenttracks.track[0];
}