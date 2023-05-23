const urlRoot = process.env.REACT_APP_BACKEND_ROOT_URL;

export const BackendClientRequest = async (path, body, headers, method) => {
    const url = urlRoot + path;
    
    if (body) {
        body = JSON.stringify(body)
    }

    const requestOptions = {
        method,
        headers,
        body: body
    };
    
    console.log(requestOptions);
    console.log(url);
    let jsonData = null;

    try {
        await fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => jsonData = data)
            .catch((err) => console.log(err));
        
    } catch (error) {
        console.log(error);
    }

    return jsonData;

}

export const BackendFetch = async (path, method, callback, body = null, headers = {}) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + path, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                ...headers 
            },
            body: body ? JSON.stringify(body) : undefined
        });
        
        console.log(response)

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error('Error fetching:', error);
    }
};