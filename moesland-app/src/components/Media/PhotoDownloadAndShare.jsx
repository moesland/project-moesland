import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import styles from '../../styles/components/PhotoDownloadAndShareStyles';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import Toast from 'react-native-simple-toast';

export default PhotoDownloadAndShare = (props) => {
    const downloadImage = async () => {
        const filename = "image.jpg"
        const fileUri = FileSystem.documentDirectory + filename;

        let downloadObject = FileSystem.createDownloadResumable(
            props.imageSrc,
            fileUri
        );

        try {
            const { uri } = await downloadObject.downloadAsync();
            await MediaLibrary.saveToLibraryAsync(uri);
            Toast.show('Afbeelding gedownload.', Toast.SHORT);

        } catch (error) {
            console.log('Error downloading or saving the image:', error);
        }
    };

    const shareImage = async () => {
        const filename = "share"
        const result = await FileSystem.downloadAsync(
            props.imageSrc,
            FileSystem.documentDirectory + filename
        );

        shareAsync(result.uri);
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={downloadImage} style={styles.button}>
                <Text style={styles.text}>DOWNLOADEN</Text>
            </Pressable>
            <Pressable onPress={shareImage} style={styles.button}>
                <Text style={styles.text}>DELEN</Text>
            </Pressable>
        </View>
    );
};
