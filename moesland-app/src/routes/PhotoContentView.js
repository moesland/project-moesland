import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/PhotoContentViewStyles';

const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
    });
    const image = result.assets[0];

    console.log(image);
};

export default function PhotoContent() {
    return (
        <View style={styles.container}>
            <Pressable onPress={takePicture} style={styles.button}>
                <Text style={styles.text}>FOTO NEMEN</Text>
            </Pressable>
        </View>
    );
}