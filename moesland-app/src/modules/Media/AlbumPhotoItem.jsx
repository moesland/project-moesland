import { Image, Pressable } from 'react-native';
import styles from '../../styles/components/AlbumPhotoItemStyles';

const AlbumPhotoItem = ({ navigation, photo, imageSrc }) => {
  const handlePress = () => {
    navigation.navigate('PhotoView', {
      imageSrc: imageSrc,
    });
  };

  return (
    <Pressable key={photo.id} style={styles.itemContainer} onPress={handlePress}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
    </Pressable>
  );
};

export default AlbumPhotoItem;