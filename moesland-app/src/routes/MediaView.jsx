import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, RefreshControl, Text, View } from 'react-native';
import PhotoContent from './PhotoContentView';
import { fetchAlbums } from '../services/FlickrApi';
import styles from '../styles/MediaViewStyles';

export default MediaView = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    const albums = await fetchAlbums();
    albums.sort((a, b) => {
      const dateA = new Date(parseInt(a.date_update, 10) * 1000);
      const dateB = new Date(parseInt(b.date_update, 10) * 1000);
      return dateB - dateA;
    });
    
    setAlbums(albums);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAlbums();
    setRefreshing(false);
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <Pressable key={item.id} style={styles.album} onPress={() => navigation.navigate('AlbumView', {
        albumName: item.title._content, albumId: item.id,
      })}>
      <View style={styles.imageContainer}>
        {/* <Image source={item.image} style={styles.image} /> */}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <PhotoContent />
    </View>
  );
};
