const urlRoot = process.env.REACT_APP_BACKEND_ROOT_URL;

export const BackendClientRequest = async (path, body, headers, method) => {
    const url = urlRoot + path;
    const requestOptions = {
        method,
        headers,
        body: JSON.stringify(body)
    };
    
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