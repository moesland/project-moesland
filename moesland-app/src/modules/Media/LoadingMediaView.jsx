import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styles from '../../styles/components/LoadingMediaViewStyles';
import { MOESLAND_GREEN } from '../../constants/colors';

const LoadingMediaView = () => {
  return (
    <View style={styles.loadingContainerWrapper}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={MOESLAND_GREEN}
          accessibilityLabel="Laden"
          accessibilityHint="De foto's worden opgehaald, een klein moment aub."
        />
        <Text style={styles.loadingText}>De foto's worden opgehaald, een klein moment aub...</Text>
      </View>
    </View>
  );
};

export default LoadingMediaView;