import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MOESLAND_GREEN, COLOR_WHITE } from '../constants/colors';

const ToolbarView = ({ showBackButton, onPressMenu }) => {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor={MOESLAND_GREEN}
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
            color={COLOR_WHITE}
          />
        )
      }
    />
  );
};

export default ToolbarView;