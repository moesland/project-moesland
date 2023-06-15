import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, Pressable, RefreshControl } from 'react-native';
import fetchNewsItems from '../services/NewsItemApi';
import styles from '../styles/views/NewsItemListViewStyles';
import { calculateImageHeightForScreenSize } from '../Utilities/HelperFunctions';

const NewsItemListView = ({ navigation }) => {

  const [newsItems, setNewsItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = useCallback(({
    item: {
      date, title, bannerImage, content,
    },
  }) => {
    const source = { uri: `${bannerImage.uri}` };

    return (
      <Pressable onPress={() => navigation.navigate('NewsItemDetailView', {
        item: {
          date, title, bannerImage, content,
        },
      })}
      >
        <View style={[styles.itemContainer]}>
          <View style={styles.textcontainer}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image source={source} style={[styles.image, { height: calculateImageHeightForScreenSize() }]} />
        </View>
      </Pressable>
    );
  }, []);

  const renderSeparator = useCallback(() => (
    <View
      style={styles.separator}
    />
  ), []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const items = await fetchNewsItems();
    setNewsItems(items);
    setRefreshing(false);
  }, []);

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
}

export default NewsItemListView;
