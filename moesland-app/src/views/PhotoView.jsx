import { Image, View, Button } from "react-native";
import styles from "../styles/views/PhotoViewStyles";
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { shareAsync } from 'expo-sharing';
import Toast from 'react-native-simple-toast';

export default PhotoView = (props) => {
  const { imageSrc } = props.route.params;

  const downloadImage = async (imageUrl) => {
    const filename = "testimage.jpg"
    const fileUri = FileSystem.documentDirectory + filename;

    let downloadObject = FileSystem.createDownloadResumable(
      imageUrl,
      fileUri
    );

    try {
      const { uri } = await downloadObject.downloadAsync();
      await MediaLibrary.saveToLibraryAsync(uri); // Save the downloaded image to the gallery
      console.log('Image downloaded and saved to the gallery.');

      Toast.show('Afbeelding gedownload.', Toast.SHORT);

    } catch (error) {
      console.log('Error downloading or saving the image:', error);
    }
  };

  const shareImage = async (imageUrl) => {
    console.log(imageUrl);
    const filename = "share"
    const result = await FileSystem.downloadAsync(
      imageUrl,
      FileSystem.documentDirectory + filename
    );

    console.log(result.uri)
    shareAsync(result.uri);
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSrc }} style={styles.photo} />
      <Button title="Downloaden" onPress={() => downloadImage(imageSrc)} />
      <Button title="Delen" onPress={() => shareImage(imageSrc)} />
    </View>
  );
};