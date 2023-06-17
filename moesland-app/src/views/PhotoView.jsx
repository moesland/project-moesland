import React from 'react';
import { Image, View } from 'react-native';
import PhotoDownload from '../modules/Media/PhotoDownload';
import styles from '../styles/views/PhotoViewStyles';

const PhotoView = ({ route }) => {
  const { imageSrc } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSrc }} style={styles.photo} />
      <PhotoDownload imageSrc={imageSrc} />
    </View>
  );
};

export default PhotoView;