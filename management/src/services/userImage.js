const { BackendFetch } = require('./ApiClient');

const getUserImages = async (query) => {
    let images;
    await BackendFetch(`/api/user-image${query}`, 'GET', data => images = data);

    return images;
};

const approveUserImage = async (userImage) => {
    const body = JSON.stringify({ id: userImage.userImageId });
    await handleUserImage(body, 'approve');
};

const declineUserImage = async (userImage) => {
    const body = JSON.stringify({ id: userImage.userImageId });
    await handleUserImage(body, 'decline');
};

const restoreUserImage = async (userImage) => {
    const body = JSON.stringify({ id: userImage.userImageId });
    await handleUserImage(body, 'restore');
};

const deleteUserImage = async (userImage) => {
    const body = JSON.stringify({ id: userImage.userImageId });
    await handleUserImage(body, 'delete');
};

const handleUserImage = async (body, action) => {
    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    });

    await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + `/api/user-image/${action}`, {
        method: 'POST',
        body: body,
        headers: headers
    });
};

export { getUserImages, approveUserImage, declineUserImage, restoreUserImage, deleteUserImage };
