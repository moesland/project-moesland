import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { fetchAlbums, fetchCoverPhotoForAlbum } from '../../services/FlickrApi';
import styles from '../../styles/components/GalleryStyles';
import AlbumItem from './AlbumItem';

export default Gallery = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    const albumPrimaryIds = albums.map(album => album.primary)
    albumPrimaryIds.forEach(primaryId => lazyFetchCoverPhoto(primaryId));
  }, [albums, lazyFetchCoverPhoto]);

  const getAlbums = async () => {
    setLoading(true);

    const albumList = await fetchAlbums(1);
    albumList.sort((a, b) => {
      const dateA = new Date(parseInt(a.date_update, 10) * 1000);
      const dateB = new Date(parseInt(b.date_update, 10) * 1000);
      return dateB - dateA;
    });

    setAlbums(albumList);
    setLoading(false);
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

  const loadMoreAlbums = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    await fetchAlbums(nextPage)
      .then(newAlbums => {
        if (newAlbums.length > 0) {
          setAlbums(prevAlbums => [...prevAlbums, ...newAlbums]);
        }
      });
  }

  const renderItem = useCallback(({ item }) => {
    const coverPhoto = coverPhotos[item.primary];

    return (
      <AlbumItem navigation={navigation} album={item} coverPhoto={coverPhoto} />
    );
  });

  const renderFooter = useCallback(() => {
    if (loading || refreshing) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
  });

  return (
    <View style={styles.view}>
      {albums.length === 0 ? (
        <ActivityIndicator size="large" color="#50a038"></ActivityIndicator>
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMoreAlbums}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )
      }
    </View>
  );
};