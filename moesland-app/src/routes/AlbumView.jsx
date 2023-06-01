import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native';
import { fetchPhotosForAlbum } from '../services/FlickrApi';
import styles from '../styles/AlbumViewStyles';

export default AlbumView = (props) => {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = props.navigation;
  const { albumName, albumId } = props.route.params;

  useEffect(() => {
    getPhotosForAlbum();
  }, []);

  const getPhotosForAlbum = async () => {
    const photos = await fetchPhotosForAlbum(albumId);
    setPhotos(photos);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPhotosForAlbum();
    setRefreshing(false);
  });

  const renderItem = useCallback(({ item }) => {
    const imageSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

    return (
      <View style={styles.container}>
        <Pressable key={item.id} style={styles.photo} onPress={() => navigation.navigate('PhotoView', {
          imageSrc: imageSrc,
        })}>
          <Image source={{ uri: imageSrc }} style={styles.photo} />
        </Pressable>
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>{albumName}</Text>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
