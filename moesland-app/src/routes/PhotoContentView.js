import React from 'react';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const takePicture = async () => {
    const { uri } = await ImagePicker.launchCameraAsync();
};

export default function PhotoContent() {
    return (
        <Pressable onPress={takePicture}>
            <Text>Foto nemen</Text>
        </Pressable>
    );
}