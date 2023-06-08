import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import styles from '../../styles/components/PhotoDownloadAndShareStyles';

export default PhotoDownloadAndShare = (props) => {
    const { imageSrc } = props.imageSrc;

    const downloadImage = async (imageUrl) => {
        const filename = "testimage.jpg"
        const fileUri = FileSystem.documentDirectory + filename;

        let downloadObject = FileSystem.createDownloadResumable(
            imageUrl,
            fileUri
        );

        try {
            const { uri } = await downloadObject.downloadAsync();
            await MediaLibrary.saveToLibraryAsync(uri); // Save the downloaded image to the gallery
            console.log('Image downloaded and saved to the gallery.');

            Toast.show('Afbeelding gedownload.', Toast.SHORT);

        } catch (error) {
            console.log('Error downloading or saving the image:', error);
        }
    };

    const shareImage = async (imageUrl) => {
        console.log(imageUrl);
        const filename = "share"
        const result = await FileSystem.downloadAsync(
            imageUrl,
            FileSystem.documentDirectory + filename
        );

        console.log(result.uri)
        shareAsync(result.uri);
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => downloadImage(imageSrc)} style={styles.button}>
                <Text style={styles.text}>DOWNLOADEN</Text>
            </Pressable>
            <Pressable onPress={() => shareImage(imageSrc)} style={styles.button}>
                <Text style={styles.text}>DELEN</Text>
            </Pressable>
        </View>
    );
};
