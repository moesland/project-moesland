import React from 'react';
import { View, Text, Pressable, Alert, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-root-toast';
import styles from '../../styles/components/PhotoDownloadStyles';

const PhotoDownload = (props) => {
    const requestDownloadPermission = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();

            if (status === 'granted') {
                downloadImage();
            } else {
                Alert.alert(
                    'Toegang geweigerd',
                    'U moet toestemming geven om de afbeelding op te slaan.',
                    [
                        { text: 'Annuleren', style: 'cancel' },
                        { text: 'Open Instellingen', onPress: openSettings },
                    ]
                );
            }
        } catch (error) {
            console.error('Error downloading or saving the image:', error);
        }
    };

    const openSettings = () => {
        Linking.openSettings();
    };

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
            Toast.show('Afbeelding gedownload.', {
                duration: Toast.durations.SHORT,
            });

        } catch (error) {
            console.error('Error downloading or saving the image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={requestDownloadPermission} style={styles.button}>
                <Text style={styles.text}>DOWNLOADEN</Text>
            </Pressable>
        </View>
    );
};

export default PhotoDownload;