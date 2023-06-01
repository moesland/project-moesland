import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/AlbumPageStyles'

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
    const handleImagePress = (image) => {
        navigation.navigate('ImageScreen', { image });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleImagePress(item.image)}>
            <Image source={item.image} style={styles.image} />
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
