import React from 'react';
import { Text, View } from 'react-native';
import Album from '../components/Media/Album';
import styles from '../styles/views/AlbumViewStyles';

export default AlbumView = (props) => {
  const { albumName } = props.route.params;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>{albumName}</Text>
      <Album navigation={props.navigation} route={props.route} />
    </View>
  );
};
