import { Image, View } from "react-native";
import styles from "../styles/views/PhotoViewStyles";
import PhotoDownloadAndShare from "../components/Media/PhotoDownloadAndShare";

export default PhotoView = (props) => {
  const { imageSrc } = props.route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSrc }} style={styles.photo} />
      <PhotoDownloadAndShare imageSrc={imageSrc} />
    </View>
  );
};