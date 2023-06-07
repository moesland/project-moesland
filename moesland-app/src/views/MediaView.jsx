import React from 'react';
import { View } from 'react-native';
import styles from '../styles/views/MediaViewStyles';
import PhotoUpload from '../components/Media/PhotoUpload';
import Gallery from '../components/Media/Gallery';

export default MediaView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Gallery navigation={navigation} />
      <PhotoUpload />
    </View>
  );
};
