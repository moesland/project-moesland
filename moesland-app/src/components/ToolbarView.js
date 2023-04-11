import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/NewsItemContentViewStyles';

const ToolbarView = ({ showBackButton, onPressMenu }) => {
  const navigation = useNavigation();
  return (
    <Header
      containerStyle={styles.header}
      leftComponent={
        showBackButton ? (
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            iconStyle={styles.icon}
          />
        ) : (
          <Icon
            name="menu"
            onPress={onPressMenu}
            iconStyle={styles.icon}
          />
        )
      }
    />
  );
};

export default ToolbarView;