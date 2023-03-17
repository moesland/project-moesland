const urlRoot = "http://localhost:5000"

export const BackendClientRequest = async (path, body, headers, method) => {
    const url = urlRoot + path;
    const requestOptions = {
        method,
        headers,
        body: JSON.stringify(body)
    };
    
    console.log(requestOptions);
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