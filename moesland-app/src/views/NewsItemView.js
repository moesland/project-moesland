import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import NewsItemController from '../controllers/NewsItemController.js';

export default class NewsItemView extends Component {
  // create news item component
  renderItem = ({ item }) => {
    return (
      <View style={[newsItemStyles.itemContainer, { flexDirection: 'row' }]}>
        <View style={{ flex: 1 }}>
          <Text style={newsItemStyles.date}>{item.date}</Text>
          <Text style={newsItemStyles.title}>{item.title}</Text>
        </View>
        <Image source={item.image} style={newsItemStyles.image} />
      </View>
    );
  }

  // create line between news items to increase readability
  renderSeparator = () => {
    return (
      <View
        style={newsItemStyles.separator}
      />
    );
  }

  state = {
    items: NewsItemController.getAllItems()
  };

  // render news item in flatlist
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

// news item styling
const newsItemStyles = {
  itemContainer: {
    padding: 5
  },
  date: {
    fontSize: 12,
    color: 'gray', 
    alignSelf: 'flex-start', 
    marginBottom: 10
  },
  image: {
    width: 150,
    height: 100
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.1,
  }
};