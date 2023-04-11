import React from 'react';
import { Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MOESLAND_GREEN, COLOR_WHITE } from '../constants/colors';
import { APP_TITLE } from '../constants/strings'

const ToolbarView = ({ showBackButton }) => {
  const navigation = useNavigation();
  const backButton = (
    <Icon
      name="arrow-back"
      onPress={() => navigation.goBack()}
      color={COLOR_WHITE}
    />
  );

  return (
    <Header
      backgroundColor={MOESLAND_GREEN}
      leftComponent={showBackButton ? backButton : null}
      centerComponent={<Text style={{ color: "#000000", fontSize: 30, fontWeight: 'bold' }}>{APP_TITLE}</Text>}
    />
  );
};

export default ToolbarView;