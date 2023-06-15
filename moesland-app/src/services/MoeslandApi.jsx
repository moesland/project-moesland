import { BACKEND_URL, FLICKR_API_KEY } from "../../env";

export const fetchDataFromBackend = async (path, method, callback = null, body = null) => {
    try {
        const response = await fetch(BACKEND_URL + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
                
        const data = await response.json();
        
        if(callback !== null) {
            await callback(data);
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching:', error);
    }
};