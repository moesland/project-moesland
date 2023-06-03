import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import VotingCategoryList from '../modules/voting/VotingCategoryList';
import styles from '../styles/votingStyles';
import { BackendFetch } from '../services/MoeslandApi';
import { getUniqueId } from '../services/infoStorage';

const VoteView = () => {
  const [events, setEvents] = useState(null);
  const [votes, setVotes] = useState({});

  const fetchEventData = async () => {
    await BackendFetch('/api/event/participants', 'GET', (data) => {
      setEvents(data);
    })
  }

  const fetchVoteData = async () => {
    const id = await getUniqueId();

    await BackendFetch(`/api/vote?deviceId=${id}`, 'GET', (data) => {
      console.log(formatVotes(data));
      setVotes(data);
    })
  }

  // Group the votes by event, category, and vote
  const formatVotes = (data) => {
    return data.reduce((result, vote) => {
      const eventId = vote.event;
      const categoryId = vote.category;
  
      if (!result[eventId]) {
        result[eventId] = {};
      }
  
      if (!result[eventId][categoryId]) {
        result[eventId][categoryId] = [];
      }
  
      result[eventId][categoryId].push(vote);
  
      return result;
    }, {});
  } 


  useEffect(() => {
    fetchEventData();
  }, [])

  useEffect(() => {
    if (events) {
      fetchVoteData();
    }
  }, [events])


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
