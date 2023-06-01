import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/AlbumPageStyles'

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
