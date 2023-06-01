import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native';
import PhotoUpload from '../components/Media/PhotoUpload';
import { fetchAlbums, fetchCoverPhotoForAlbum } from '../services/FlickrApi';
import styles from '../styles/views/MediaViewStyles';

export default MediaView = ({ navigation }) => {
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
      <Pressable key={item.id} style={styles.itemContainer} onPress={() => navigation.navigate('AlbumView', {
        albumName: item.title._content, albumId: item.id,
      })}>
        <View style={styles.imageContainer}>
          {<Image source={{ uri: coverPhoto }} style={styles.image} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title._content}</Text>
          <Text style={styles.description}>{item.count_photos}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <View style={{ flex: 1 }}>
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
      <PhotoUpload />
    </View>
  );
};
