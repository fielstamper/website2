let lastUpdate = 0;
let cachedResponse: object | undefined;

export async function GET(request: Request) {
    const now = Date.now();
    const waitMs: number = 15 * 1000;

    if (!cachedResponse) {
        // If there's no cached response, fetch it immediately
        cachedResponse = await fetchRecentTrack();
        lastUpdate = now;
    } else if (now - lastUpdate >= waitMs) {
        // If cache is expired, trigger async update but return immediately
        lastUpdate = now;
        fetchRecentTrack().then(data => cachedResponse = data);
    }

    return Response.json(cachedResponse);
}

async function fetchRecentTrack() {
    const params = new URLSearchParams({
        method: "user.getrecenttracks",
        limit: "1",
        user: "jopenuts",
        api_key: "  12312321 3213 21 3213 ",
        format: "json"
    });

    const url = `https://ws.audioscrobbler.com/2.0/?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.recenttracks.track[0];
}