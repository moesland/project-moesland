import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/PhotoAlbumStyles';

const data = [
  {
    id: '1',
    title: 'Image 1',
    description: '200 photos',
    image: require('../images/sample.jpg'),
  },
  {
    id: '2',
    title: 'Image 2',
    description: '150 photos',
    image: require('../images/sample.jpg'),
  },
  {
    id: '3',
    title: 'Image 3',
    description: '150 photos',
    image: require('../images/sample.jpg'),
  },
  {
    id: '4',
    title: 'Image 4',
    description: '150 photos',
    image: require('../images/sample.jpg'),
  },
  {
    id: '5',
    title: 'Image 5',
    description: '170 photos',
    image: require('../images/sample.jpg'),
  },

];

const GridView = ({ navigation }) => {
  const handleImagePress = () => {
    navigation.navigate('AlbumPage');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={handleImagePress}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default GridView;