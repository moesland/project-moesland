import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import PhotoContent from './PhotoContentView';
import { fetchAlbums } from '../services/FlickrApi';

export default MediaView = () => {
  const [albums, setAlbums] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    const albums = await fetchAlbums();
    setAlbums(albums);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAlbums();
    setRefreshing(false);
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <View>
        {console.log(item.id)}
        <Text>{item.id}</Text>
      </View>
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
