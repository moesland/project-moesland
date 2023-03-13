export const BackendClient = async (url) => {
    query = encodeURIComponent(query);

    try {
        const response = await fetch(url);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
    }
}