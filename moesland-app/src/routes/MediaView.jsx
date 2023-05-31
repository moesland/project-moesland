import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PhotoContent from './PhotoContentView';
import { fetchAlbums } from '../services/FlickrApi';

export default MediaView = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const albums = await fetchAlbums();
      setAlbums(albums);
    };

    getAlbums();
  }, []);

  return (
    <View>
      {albums.map(album => {
        <Text key={album.id}>{album.id}</Text>
      })}

      <PhotoContent />
    </View>
  );
};
