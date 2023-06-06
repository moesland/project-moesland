import React from 'react';
import { View } from 'react-native';
import PhotoUpload from '../components/Media/PhotoUpload';
import Gallery from '../components/Media/Gallery';

export default MediaView = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Gallery navigation={navigation} />
      <PhotoUpload />
    </View>
  );
};
