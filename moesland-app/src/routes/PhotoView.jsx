import { Image, View } from "react-native";
import styles from "../styles/PhotoViewStyles";

export default PhotoView = (props) => {
  const { imageSrc } = props.route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSrc }} style={styles.photo} />
    </View>
  );
};