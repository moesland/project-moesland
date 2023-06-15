import React from 'react';
import { View } from 'react-native';
import Gallery from '../components/Media/Gallery';
import PhotoUpload from '../components/Media/PhotoUpload';
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