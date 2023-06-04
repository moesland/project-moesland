import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import VotingCategoryList from '../modules/voting/VotingCategoryList';
import styles from '../styles/votingStyles';
import { BackendFetch } from '../services/MoeslandApi';
import { getUniqueId } from '../services/infoStorage';
import { calculateDistance, getCurrentLocation } from '../services/locationService';

const VoteView = () => {
  const [events, setEvents] = useState([]);
  const [votes, setVotes] = useState({});

  const fetchEventData = async () => {
    let location = await getCurrentLocation();

    await BackendFetch('/api/event/participants', 'GET', (data) => {
      setEvents(formatEvents(data, location));
    })
  }

  const fetchVoteData = async () => {
    const id = await getUniqueId();

    await BackendFetch(`/api/vote?deviceId=${id}`, 'GET', (data) => {
      setVotes(formatVotes(data));
    })
  }

  const formatEvents = (data, location) => {
    return data.filter((event) => {
      if (event.isParade === true && event.latitude !== undefined && event.longitude !== undefined) {
        if (event.radius === 0) {
          return true; // Infinite radius, include the event
      } else {
          const distance = calculateDistance(event.latitude, event.longitude, location.latitude, location.longitude);
          return distance <= event.radius;
      }
      }
      return false;
    })
  }

  const formatVotes = (data) => {
    return data.reduce((result, vote) => {
      const eventId = vote.event;
      const categoryId = vote.category;

      if (!result[eventId]) {
        result[eventId] = {};
      }

      if (!result[eventId][categoryId]) {
        result[eventId][categoryId] = vote;
      }

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
    <SafeAreaView style={styles.paradeContainer}>
      {events && events.map(event => (
        <View style={styles.paradeContainer} key={event._id}>
          <View style={styles.paradeTitleContainer}>
            <Text style={styles.paradeTitle}>{event.title}</Text>
          </View>
          <FlatList
            data={event.categories}
            renderItem={({ item }) => <VotingCategoryList data={item} votes={votes} setVotes={setVotes} />}
            keyExtractor={item => item._id}
          />
        </View>
      ))}

      {(!events || events.length < 1) &&
        <View style={styles.noParticipantsContainer}>
          <Text style={styles.noParticipantsText}> Er zijn geen deelnames om te stemmen. </Text>
        </View>
      }

    </SafeAreaView>
  );
};

export default VoteView;
