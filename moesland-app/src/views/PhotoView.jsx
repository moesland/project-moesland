import { Image, View, Button, PermissionsAndroid } from "react-native";
import styles from "../styles/views/PhotoViewStyles";

export default PhotoView = (props) => {
  const { imageSrc } = props.route.params;

  const downloadImage = async () => {
    const imageUrl = 'https://farm2.staticflickr.com/1103/567229075_2cf8456f01_b.jpg%22'
    
  };
  

  

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSrc }} style={styles.photo} />
      <Button title="Download Image" onPress={downloadImage} />
    </View>
  );
};