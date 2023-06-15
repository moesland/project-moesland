import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styles from '../styles/components/LoadingMediaViewStyles';

const LoadingMediaView = () => {
  return (
    <View style={styles.loadingContainerWrapper}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#50a038" />
        <Text style={styles.loadingText}>De foto's worden opgehaald, een klein moment aub...</Text>
      </View>
    </View>
  );
};

export default LoadingMediaView;
