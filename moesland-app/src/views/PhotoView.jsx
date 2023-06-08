import { Image, View, Button } from "react-native";
import styles from "../styles/views/PhotoViewStyles";
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { shareAsync } from 'expo-sharing';

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

    } catch (error) {
      console.log('Error downloading or saving the image:', error);
    }
  };

  const save = (uri) => {
    shareAsync(uri);
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSrc }} style={styles.photo} />
      <Button title="Download Image" onPress={() => downloadImage(imageSrc)} />
      <Button
      title='Show toast'
      onPress={showToast}
    />
    <Button title="Download Image" onPress={() => downloadImage(imageSrc)} />
    <Button title="Download Image" onPress={() => downloadImage(imageSrc)} />
    <Button title="Download Image" onPress={() => downloadImage(imageSrc)} />
    </View>
  );
};