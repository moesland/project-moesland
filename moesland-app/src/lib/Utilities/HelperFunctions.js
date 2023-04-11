import { Dimensions, Image } from 'react-native';

export const calculateImageHeight = (uri) => {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const aspectRatio = width / height;
      const calculatedImageHeight = screenWidth / aspectRatio;
      resolve(calculatedImageHeight);
    }, (error) => {
      reject(error);
    });
  });
}