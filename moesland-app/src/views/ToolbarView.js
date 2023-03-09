import React from 'react';
import { Header, Icon } from 'react-native-elements';

const ToolbarView = ({ onPressMenu }) => {
  return (
    <Header
      backgroundColor="#50a038"
      leftComponent={
        <Icon
          name="menu"
          color="#fff"
          onPress={onPressMenu}
        />
      }
    />
  );
};

export default ToolbarView;
