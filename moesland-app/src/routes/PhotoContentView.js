import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { styles } from '../styles/PhotoContentViewStyles';

const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.9
    });

    const image = result.assets[0];
    const imageUri = image.uri;
    const response = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
    const now = new Date();
    const imageName = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const imageData = response;
    const imageType = image.type;

    try {
        const REACT_APP_BACKEND_ROOT_URL = 'http://192.168.68.121:5000';
        const responseJson = await fetch(REACT_APP_BACKEND_ROOT_URL + '/api/userImage/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: {
                    name: imageName,
                    data: imageData,
                    contentType: imageType
                }
            })
        });
        const json = await responseJson.json();

        console.log('Response:    ' + json);
    } catch (err) {
        console.error(err);
    }
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