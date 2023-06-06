import { Image, Pressable } from 'react-native';
import styles from '../../styles/components/AlbumPhotoItemStyles';

export default AlbumPhotoItem = ({ navigation, photo, imageSrc }) => {
  return (
    <Pressable key={photo.id} style={styles.itemContainer} onPress={() => navigation.navigate('PhotoView', {
      imageSrc: imageSrc,
    })}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
    </Pressable>
  );
};