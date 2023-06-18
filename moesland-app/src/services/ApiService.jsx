export const fetchFromMoesland = async (path, method, callback = null, body = null) => {
    try {
        const response = await fetch(process.env.BACKEND_URL + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            throw new Error(`Request failed with statuscode ${response.status}`);
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