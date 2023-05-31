const fetchAlbums = async () => {
    const apiKey = process.env.FLICKR_API_KEY;
    const userId = '139654880@N02';
    const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (result.stat === 'ok') {
            const albums = result.photosets.photoset;
            return albums;
        } else {
            console.error('Error:', result.message);
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
};

export { fetchAlbums };