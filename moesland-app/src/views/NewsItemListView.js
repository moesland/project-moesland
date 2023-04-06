import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import { fetchNewsItems } from '../models/NewsItemApi';
import NewsItemController from '../controllers/NewsItemController.js';
import { base64 } from 'react-native-base64';

const NewsItemListView = ({ navigation }) => {
  // React Native Hook
  // initializes 'newsItems' as an empty array
  // 'setNewsItems' function is used to update state
  const [newsItems, setNewsItems] = useState([]);

  // useCallback is a React Native Hook that memoizes a function to improve performance
  // memoization = caching the results of a function call to improve performance by avoiding unnecessary computation
  const renderItem = useCallback(({ item: { date, title, bannerImage, content } }) => {
    let source = null;

    if (content[0].image) {
      source = content[0].image ? { uri: `${content[0].image}` } : null;
    }

    return (
      <Pressable onPress={() => navigation.navigate('NewsDetailPage', { item: { date, title, bannerImage, content } })}>
        <View style={[styles.itemContainer, { flexDirection: 'row' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image source={source} style={styles.image} />
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

  // React Native Hook
  // fetches data async after the newsitemlistview is first rendered
  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchNewsItems();
      setNewsItems(items);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={newsItems}
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