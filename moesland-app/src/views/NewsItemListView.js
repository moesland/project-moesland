import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { fetchNewsItems } from '../models/NewsItemApi';
import { styles } from '../styles/newsItemListViewStyles.js';

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

export default NewsItemListView;