import React from 'react';
import { View } from 'react-native';
import Gallery from '../modules/Media/Gallery';
import PhotoUpload from '../modules/Media/PhotoUpload';
import styles from '../styles/views/MediaViewStyles';

const MediaView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Gallery navigation={navigation} />
      <PhotoUpload />
    </View>
  );
};

export default MediaView;