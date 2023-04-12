import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, View, Text, Image, FlatList, Pressable, RefreshControl } from 'react-native';
import { fetchNewsItems } from '../models/NewsItemApi';
import { styles } from '../styles/NewsItemListViewStyles';

const NewsItemListView = ({ navigation }) => {
  // React Native Hook
  // initializes 'newsItems' as an empty array
  // 'setNewsItems' function is used to update state
  const [newsItems, setNewsItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // useCallback is a React Native Hook that memoizes a function to improve performance
  // memoization = caching the results of a function call to improve performance by avoiding unnecessary computation
  const renderItem = useCallback(({ item: { date, title, bannerImage, content } }) => {
    let source = { uri: `${bannerImage.uri}` };

    return (
      <Pressable onPress={() => navigation.navigate('NewsItemDetailView', { item: { date, title, bannerImage, content } })}>
        <View style={[styles.itemContainer]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image source={source} style={[styles.image, { height: 100 }]} />
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const items = await fetchNewsItems();
    setNewsItems(items);
    setRefreshing(false);
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default NewsItemListView;