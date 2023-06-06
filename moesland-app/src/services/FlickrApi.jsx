import { ALBUMS_PER_PAGE, PHOTOS_PER_PAGE } from '../constants/media';

const apiKey = process.env.FLICKR_API_KEY;
const userId = '139654880@N02';

const fetchAlbums = async (page) => {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&page=${page}&per_page=${ALBUMS_PER_PAGE}&user_id=${userId}&format=json&nojsoncallback=1`;

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

const fetchCoverPhotoForAlbum = async (albumPrimaryId) => {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${albumPrimaryId}&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    if (result.stat === 'ok') {
      const photo = result.photo;
      return photo;
    } else {
      console.error('Error:', result.message);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const fetchPhotosForAlbum = async (albumId, page) => {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&page=${page}&per_page=${PHOTOS_PER_PAGE}&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    if (result.stat === 'ok') {
      const photos = result.photoset.photo;
      return photos;
    } else {
      console.error('Error:', result.message);
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { fetchAlbums, fetchCoverPhotoForAlbum, fetchPhotosForAlbum };