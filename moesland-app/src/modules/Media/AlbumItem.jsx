import { Image, Pressable, Text, View } from 'react-native';
import styles from '../../styles/components/AlbumItemStyles';

const AlbumItem = ({ navigation, album, coverPhoto }) => {
  const photoCountText = `${album.count_photos} ${album.count_photos <= 1 ? 'foto' : 'foto\'s'}`;

  return (
    <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('AlbumView', {
      albumName: album.title._content, albumId: album.id, photoCount: album.count_photos,
    })}>
      <View key={album.id} style={styles.imageContainer}>
        <Image source={{ uri: coverPhoto }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{album.title._content}</Text>
        <Text style={styles.description}>{photoCountText}</Text>
      </View>
    </Pressable>
  );
};

export default AlbumItem;