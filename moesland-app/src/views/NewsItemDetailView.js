import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';

export default class NewsItemListView extends Component {
    render() {

        const { route, imageDimensions } = this.props;
        const { item } = route.params;

        const aspectRatio = Dimensions.get('window').width / Dimensions.get('window').height;
        const imageHeight = screenWidth / aspectRatio;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={item.image}
                        style={[styles.image, { width: screenWidth, height: imageHeight }]}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </ScrollView>
        );
    }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        resizeMode: 'cover',
    },    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'justify',
        marginBottom: 20,
    },
});
