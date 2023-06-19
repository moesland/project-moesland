const { BackendFetch } = require("./ApiClient");

const getNewsArticles = async () => {
    let articles;
    await BackendFetch('/api/news-article', 'GET', data => articles = data);

    return articles;
};

const createNewsArticle = async (body) => {
    const token = localStorage.getItem('token');

    return await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/news-article/create', {
        method: 'POST',
        body: body,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateNewsArticle = async (body) => {
    const token = localStorage.getItem('token');

    return await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/news-article/update', {
        method: 'POST',
        body: body,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteNewsArticle = async (id) => {
    const token = localStorage.getItem('token');
    const body = {
        _id: id
    };

    return await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/news-article/delete', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export { getNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle}
