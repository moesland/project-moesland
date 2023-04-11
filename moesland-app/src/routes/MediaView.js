import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { BACKEND_URL } from "@env"

export default MediaView = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setSelectedImage({
            name: "test name",
            data: "test data",
            contentType: "test content"
        })
    }, [])

    const uploadImage = async () => {
        const url = `${BACKEND_URL}/api/user-image/create`
        axios.post(url, selectedImage).then(response => {
            if (response.status == 200) {
                cancelImage();
                Alert.alert("Melding", `${selectedImage.name} is upgeload!`)
            }
        }).catch(error => {
            console.log(error);
        })

    }

    const cancelImage = () => {
        setSelectedImage(null)
    }

    return (
        <View>
            <Text>Media</Text>

            {selectedImage &&
                <View>
                    <Button onPress={uploadImage} title="Upload" />
                    <Button onPress={cancelImage} title="Annuleren" />
                </View>
            }
        </View>
    )

}