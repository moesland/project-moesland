import React from 'react';
import { Text, View } from 'react-native';
import Album from '../components/Media/Album';
import styles from '../styles/views/AlbumViewStyles';

const AlbumView = ({ navigation, route }) => {
  const { albumName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{albumName}</Text>
      <Album navigation={navigation} route={route} />
    </View>
  );
};

export default AlbumView;