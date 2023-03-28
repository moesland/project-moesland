import React from 'react';
import { Text, Image } from 'react-native';

export default function NewsItemContent({ content }) {
  if (content.text) {
    return (
      <Text style={styles.text}>
        {content.text}
      </Text>
    );
  } else if (content.image) {
    return (
      <Image
        source={content.image}
        onLayout={this.handleImageLayout}
        style={[styles.bannerImage, { height: imageHeight }]}
        resizeMode="contain"
      />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    bannerImage: {
        width: '100%',
        marginBottom: 10,
    },
    image: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        padding: 5,
        textAlign: "left",
    },
    boldText: {
        fontWeight: 'bold',
    }
});