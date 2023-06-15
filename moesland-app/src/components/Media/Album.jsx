import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import AlbumPhotoItem from './AlbumPhotoItem';
import { fetchPhotosForAlbum } from '../../services/FlickrApi';
import { PHOTOS_PER_PAGE } from '../../constants/media';
import LoadingMediaView from './LoadingMediaView';

const Album = ({ navigation, route }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { albumId, photoCount } = route.params;

  useEffect(() => {
    const maxPage = Math.ceil(photoCount / PHOTOS_PER_PAGE);
    setMaxPage(maxPage);

    getPhotosForAlbum();
  }, []);

  const getPhotosForAlbum = async () => {
    setLoading(true);

    const photos = await fetchPhotosForAlbum(albumId, 1);
    setPhotos(photos);

    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPhotosForAlbum();
    setRefreshing(false);
  });

  const loadMorePhotos = async () => {
    if (currentPage >= maxPage) {
      return;
    }

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const newPhotos = await fetchPhotosForAlbum(albumId, nextPage);
    if (newPhotos.length > 0) {
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  };

  const renderItem = useCallback(({ item }) => {
    const imageSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

    return (
      <AlbumPhotoItem
        key={item.id}
        navigation={navigation}
        photo={item}
        imageSrc={imageSrc}
      />
    );
  }, [navigation]);

  const renderFooter = useCallback(() => {
    if (loading || refreshing) {
      return (
        <View>
          <LoadingMediaView />
        </View>
      );
    }
    return null;
  }, [loading, refreshing]);

  return (
    <View>
      {photos.length === 0 ? (
        <LoadingMediaView />
      ) : (
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
          ListFooterComponent={renderFooter}
        />
      )
      }
    </View>
  );
};

export default Album