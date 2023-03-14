import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Image, Text } from 'react-native';

export default class NewsItemListView extends Component {

    state = {
        imageHeight: null,
    };

    constructor(props) {
        super(props);
        const { item } = props.route.params;
        this.state = {
            item: item
        };
    }

    handleImageLayout = event => {
        const { width } = Dimensions.get('window');
        const { height } = event.nativeEvent.layout;
        const aspectRatio = this.getImageAspectRatio();
        const imageHeight = width / aspectRatio;
        this.setState({ imageHeight });
    };

    getImageAspectRatio = () => {
        const { item } = this.state;
        const source = Image.resolveAssetSource(item.bannerImage);
        return source.width / source.height;
    };

    render() {
        const { route } = this.props;
        const { item } = route.params;
        const { imageHeight } = this.state;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={item.bannerImage}
                        onLayout={this.handleImageLayout}
                        style={[styles.image, { height: imageHeight }]}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        padding: 5,
    },
});