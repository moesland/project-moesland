import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from '../../styles/components/PhotoUploadStyles';
import { uploadUserImage } from '../../api/UserImageApi';
import { Camera } from 'expo-camera';

const PhotoUpload = () => {
  const takePicture = async () => {
    try {
      const { status } = await Camera.getCameraPermissionsAsync();
      if (status !== 'granted') {
        await Camera.requestCameraPermissionsAsync();
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.9,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        const imageUri = image.uri;
        const response = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
        const now = new Date();
 
        const imageName = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
        const imageData = response;
        const imageType = getMimeTypeFromExtension(image.uri);

        await uploadUserImage(imageName, imageData, imageType);
      }

    } catch (error) {
      console.error('An error occurred during photo upload:', error);
    }
  };

  const getMimeTypeFromExtension = (filePath) => {
    const extension = filePath.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={takePicture} style={styles.button}>
        <Text style={styles.text}>FOTO NEMEN</Text>
      </Pressable>
    </View>
  );
};

export default PhotoUpload;