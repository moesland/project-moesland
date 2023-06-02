export const BackendFetch = async (path, method, callback, body = null) => {
    try {
        const response = await fetch(process.env.BACKEND_URL + path, {
            method: method,
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        callback(data);
    } catch (error) {
        console.error('Error fetching:', error);
    }
};