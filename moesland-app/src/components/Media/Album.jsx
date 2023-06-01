import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { fetchPhotosForAlbum } from '../../services/FlickrApi';
import AlbumPhotoItem from './AlbumPhotoItem';

export default Album = ({ navigation, route }) => {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { albumId } = route.params;

  useEffect(() => {
    getPhotosForAlbum();
  }, []);

  const getPhotosForAlbum = async () => {
    const photos = await fetchPhotosForAlbum(albumId, 1);
    setPhotos(photos);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPhotosForAlbum();
    setRefreshing(false);
  });

  const loadMorePhotos = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    await fetchPhotosForAlbum(albumId, nextPage)
      .then(newPhotos => {
        if (newPhotos.length > 0) {
          setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        }
      });
  };

  const renderItem = useCallback(({ item }) => {
    const imageSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

    return (
      <AlbumPhotoItem navigation={navigation} photo={item} imageSrc={imageSrc} />
    );
  });

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={3}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={loadMorePhotos}
      onEndReachedThreshold={0.5}
    />
  );
};