import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ToolbarView from './src/views/ToolbarView';
import NewsItemView from './src/views/NewsItemView';

export default class App extends Component {

  handleMenuPress = () => {
    // handle the menu press event
  };

  render() {
    return (
      <View style={styles.container}>
        <ToolbarView onPressMenu={this.handleMenuPress} />
        {
          <NewsItemView />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});