import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import NewsItemController from '../controllers/NewsItemController.js';

const NewsItemListView = ({ navigation }) => {
  const [items, setItems] = useState([]);

  const renderItem = useCallback(({ item: { date, title, image, text } }) => {
    return (
      <Pressable onPress={() => navigation.navigate('NewsDetailPage', { item: { date, title, image, text } })}>
        <View style={[styles.itemContainer, { flexDirection: 'row' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image source={image} style={styles.image} />
        </View>
      </Pressable>
    );
  }, []);

  const renderSeparator = useCallback(() => {
    return (
      <View
        style={styles.separator}
      />
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const items = await NewsItemController.getAllItems();
      setItems(items);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default NewsItemListView;
