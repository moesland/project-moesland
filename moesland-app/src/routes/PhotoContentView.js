import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { styles } from '../styles/PhotoContentViewStyles';

const getMimeTypeFromExtension = (filePath) => {
    const extension = filePath.split('.').pop().toLowerCase();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        default:
            return null;
    }
}

export default PhotoContent = (setImage) => {
    const takePicture = async () => {
        try {
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
            const imageType = getMimeTypeFromExtension(image.uri);

            //setImage({
            //    name: imageName,
            //    data: imageData,
            //    contentType: imageType
            //});

            const REACT_APP_BACKEND_ROOT_URL = 'http://192.168.68.121:5000';
            await fetch(REACT_APP_BACKEND_ROOT_URL + '/api/user-image/create', {
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
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={takePicture} style={styles.button}>
                <Text style={styles.text}>FOTO NEMEN</Text>
            </Pressable>
        </View>
    );
}