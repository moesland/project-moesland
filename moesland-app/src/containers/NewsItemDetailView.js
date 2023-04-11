import React, { Component } from 'react';
import { Dimensions, View, ScrollView, Image, Text } from 'react-native';
import NewsItemContentView from './NewsItemContentView';
import { styles } from '../styles/NewsItemDetailViewStyles';

export default class NewsItemListView extends Component {
    state = {
        imageWidth: null,
        item: this.props.route.params.item,
    };

    handleImageLayout = () => {
        const screenWidth = Dimensions.get('window').width;
        const { item } = this.state;

        Image.getSize(item.bannerImage.uri, (width, height) => {
            const aspectRatio = width / height;
            const usableImageHeight = width / aspectRatio;
            this.setState({ imageHeight: height });
        });
    };

    render() {
        const { item } = this.props.route.params;
        const { imageHeight } = this.state;
            this.handleImageLayout()
        return (
            <ScrollView>
                <View style={styles.container}>
                    {imageHeight ? (
                        <Image
                            source={{ uri: item.bannerImage.uri }}
                            style={[styles.bannerImage, { height: imageHeight }]}
                            resizeMode="contain"
                        />
                    ) : null}
                    <Text style={styles.title}>{item.title}</Text>
                    {item.content.map((content, index) => (
                        <NewsItemContentView key={index} content={content} />
                    ))}
                </View>
            </ScrollView>
        );
    }
}