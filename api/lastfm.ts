let lastUpdate = 0;
let cachedResponse: object | undefined;

export async function GET(request: Request) {
    const now = Date.now();
    const waitMs: number = 10 * 1000;

    if (!cachedResponse) {
        cachedResponse = await fetchRecentTrack();
        lastUpdate = now;
    } else if (now - lastUpdate >= waitMs) {
        lastUpdate = now;
        fetchRecentTrack().then(data => cachedResponse = data);
    }

    return Response.json(cachedResponse);
}

async function fetchRecentTrack(): Promise<object> {
    const params = new URLSearchParams({
        method: "user.getrecenttracks",
        limit: "1",
        user: "swagster736",
        api_key: "f882cdfc41488cde6404236b20bb0095",
        format: "json"
    });

    try {
        const url = `https://ws.audioscrobbler.com/2.0/?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        return data.recenttracks.track[0];
    } catch {
        if (cachedResponse)
            return cachedResponse;
        else
            return await fetchRecentTrack();
    }
}