import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import VotingCategoryList from '../modules/voting/VotingCategoryList';
import styles from '../styles/votingStyles';
import { BackendFetch } from '../services/MoeslandApi';

const VoteView = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    BackendFetch('/api/event/participants', 'GET', (data) => {
      setEvents(data);
    })
  }, [])


  return (
    <SafeAreaView>
      {events && events.map(event => (
        <View key={event._id}>
          <View style={styles.paradeTitleContainer}>
            <Text style={styles.paradeTitle}>{event.title}</Text>
          </View>
          <FlatList
            data={event.categories}
            renderItem={({ item }) => <VotingCategoryList data={item} />}
            keyExtractor={item => item._id}
          />
        </View>
      ))}

      {!events &&
        <View>
          <Text> Er zijn geen deelnames om te stemmen. </Text>
        </View>
      }

    </SafeAreaView>
  );
};

export default VoteView;
