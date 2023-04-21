import React from 'react';
import { Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MOESLAND_GREEN } from '../constants/colors';
import styles from '../styles/ToolbarViewStyles';
import { APP_TITLE } from '../constants/strings';

function ToolbarView({ showBackButton }) {
  const navigation = useNavigation();
  const backButton = (
    <Icon
      name="arrow-back"
      onPress={() => navigation.goBack()}
    />
  );

  return (
    <Header
      backgroundColor={MOESLAND_GREEN}
      leftComponent={showBackButton ? backButton : null}
      centerComponent={<Text style={styles.text}>{APP_TITLE}</Text>}
    />
  );
}

export default ToolbarView;
