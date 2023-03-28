import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';

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
        style={[styles.image, { height: 450 }]}
        resizeMode="contain"
      />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        padding: 5,
        textAlign: "left",
    }
});