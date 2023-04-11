import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ToolbarView = ({ showBackButton, onPressMenu }) => {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor="#50a038"
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
            color="#fff"
          />
        )
      }
    />
  );
};

export default ToolbarView;