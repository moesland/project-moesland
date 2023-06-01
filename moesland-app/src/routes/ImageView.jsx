import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/ImageViewStyles';

const ImageScreen = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default ImageScreen;