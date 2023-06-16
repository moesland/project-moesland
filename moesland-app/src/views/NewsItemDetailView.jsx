import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import NewsItemContentView from '../components/NewsItemContentView';
import styles from '../styles/views/NewsItemDetailViewStyles';
import { calculateImageHeightForAspectRatio } from '../utilities/HelperFunctions';

export default class NewsItemListView extends Component {
  state = {
    imageHeight: null,
    item: this.props.route.params.item,
  };

  componentDidMount() {
    const { item } = this.props.route.params;
    calculateImageHeightForAspectRatio(item.bannerImage.uri)
      .then((calculatedImageHeight) => {
        this.setState({ imageHeight: calculatedImageHeight });
      })
      .catch((error) => {
        console.log(`Error calculating image height: ${error}`);
      });
  }

  render() {
    const { item } = this.props.route.params;
    const { imageHeight } = this.state;

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
