import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { fetchAlbums, fetchCoverPhotoForAlbum } from '../../services/FlickrApi';
import styles from '../../styles/components/GalleryStyles';
import AlbumItem from './AlbumItem';

export default Gallery = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    const albumPrimaryIds = albums.map(album => album.primary)
    albumPrimaryIds.forEach(primaryId => lazyFetchCoverPhoto(primaryId));
  }, [albums, lazyFetchCoverPhoto]);

  const getAlbums = async () => {
    const albumList = await fetchAlbums();
    albumList.sort((a, b) => {
      const dateA = new Date(parseInt(a.date_update, 10) * 1000);
      const dateB = new Date(parseInt(b.date_update, 10) * 1000);
      return dateB - dateA;
    });

    setAlbums(albumList);
  };

  const lazyFetchCoverPhoto = useCallback(async (albumPrimaryId) => {
    const coverPhoto = await fetchCoverPhotoForAlbum(albumPrimaryId);
    if (coverPhoto) {
      const photo = `https://live.staticflickr.com/${coverPhoto.server}/${coverPhoto.id}_${coverPhoto.secret}.jpg`;
      setCoverPhotos((prevState) => ({
        ...prevState,
        [albumPrimaryId]: photo,
      }));
    }
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAlbums();
    setRefreshing(false);
  });

  const renderItem = useCallback(({ item }) => {
    const coverPhoto = coverPhotos[item.primary];

    return (
      <AlbumItem navigation={navigation} album={item} coverPhoto={coverPhoto} />
    );
  });

  return (
    <FlatList
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};