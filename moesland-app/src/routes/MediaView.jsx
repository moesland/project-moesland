import React from 'react';
import { View } from 'react-native';
import PhotoUpload from '../components/Media/PhotoUpload';
import Album from '../components/Media/Album';

export default MediaView = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Album navigation={navigation} />
      <PhotoUpload />
    </View>
  );
};
