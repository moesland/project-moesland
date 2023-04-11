import React, { useState, useEffect } from 'react';
import { Text, Image, Linking } from 'react-native';
import { styles } from '../styles/NewsItemContentViewStyles';
import { calculateImageHeight } from '../lib/Utilities/HelperFunctions';

export default function NewsItemContent({ content }) {
  const { text, attributes } = content;
  const { bold, italic, underline, align, size, header, link } = attributes;

  // Apply styles based on attribute values
  const textStyles = [
    styles.text,
    bold && styles.bold,
    italic && styles.italic,
    underline && styles.underline,
    align === 'left' && styles.leftAlign,
    align === 'right' && styles.rightAlign,
    align === 'center' && styles.centerAlign,
    align === 'justify' && styles.justifyAlign,
    size === 'small' && styles.smallText,
    size === 'large' && styles.largeText,
    size === 'huge' && styles.hugeText,
    header === 1 && styles.bold,
    header === 2 && styles.h2,
  ];

  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (content.image) {
      calculateImageHeight(content.image)
      .then((calculatedImageHeight) => {
        setImageHeight(calculatedImageHeight);
      })
      .catch((error) => {
        console.log(`Error calculating image height: ${error}`);
      });
    }
  }, [content]);

  const handleImageLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setImageHeight(height);
  };

  if (typeof text === 'string' && text.trim().length > 0) {
    return (
      <Text style={textStyles} onPress={() => link && Linking.openURL(link)}>
        {text}
      </Text>
    );
  } else if (content.image) {
    let source = { uri: `${content.image}` };
    return (
      <Image
        source={source}
        onLayout={handleImageLayout}
        style={[styles.image, { height: imageHeight }]} // TODO: use handleimagelayout 
        resizeMode="contain"
      />
    );
  } else {
    return null;
  }
}