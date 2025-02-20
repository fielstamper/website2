let lastUpdate = 0;
let cachedResponse: object | undefined;

export async function GET(request: Request) {
    const now = Date.now();

    const waitMs: number = 15 * 1000;
    if (!cachedResponse || now - lastUpdate >= waitMs) {
        lastUpdate = now;

        const params = new URLSearchParams({
            method: "user.getrecenttracks",
            limit: "1",
            user: "swagster736",
            api_key: "f882cdfc41488cde6404236b20bb0095",
            format: "json"
        });

        const url = `https://ws.audioscrobbler.com/2.0/?${params.toString()}`;
        const response = await fetch(url);
        // TODO: Check for errors.
        const data = await response.json();
        cachedResponse = data.recenttracks.track[0];

    }

    return Response.json(cachedResponse);
}