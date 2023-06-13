import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, View, Text } from 'react-native';
import VotingCategoryList from '../modules/voting/VotingCategoryList';
import styles from '../styles/votingStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchEventData, fetchVoteData, sendVoteRequest } from '../services/VoteApi';
import VotingItem from '../modules/voting/VotingItems';

const VoteView = () => {
  const [events, setEvents] = useState([]);
  const [votes, setVotes] = useState({});
  const [voteRequests, setVoteRequests] = useState({});
  const [newRequests, setNewRequests] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onHandleUpdate = async () => {
    const updated = await sendVoteRequest(voteRequests);
    if(updated) {
      setVoteRequests({});
      fetchVotes();
    }
  }

  const fetchVotes = async () => {
    const data = await fetchVoteData();
    setVotes(data);
  }

  const fetchEvent = async () => {
    const data = await fetchEventData();
    setEvents(data);
  }

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    if (events) {
      fetchVotes();
    }
  }, [events]);

  useEffect(() => {
    if (
      voteRequests &&
      Object.keys(voteRequests).length > 0 &&
      Object.values(voteRequests).some(request => Object.keys(request).length > 0)
    ) {
      setNewRequests(true);
    } else {
      setNewRequests(false);
    }
  }, [voteRequests]);


  const onHandleRefresh = async () => {
    setRefreshing(true);
    
    await fetchEvent();
    
    setRefreshing(false);
  }

  const eventItem = ({ item }) => {
    const votingItem = ({ item }) => {
      return (<VotingItem key={item._id} data={item} votes={votes} voteRequests={voteRequests} setVoteRequests={setVoteRequests} />)
    }

    return (
      <View key={item._id}>
        <View style={styles.paradeTitleContainer}>
          <Text style={styles.paradeTitle}>{item.title}</Text>
        </View>

        {item.categories.map(category => (
          <VotingCategoryList key={category._id} data={category} votingItem={votingItem} />
        ))}

      </View>
    )
  }

  return (
    <View style={styles.eventContainer}>
      {events &&
        <FlatList
          style={styles.eventListContainer}
          data={events}
          onRefresh={onHandleRefresh}
          refreshing={refreshing}
          renderItem={eventItem}
          keyExtractor={event => event._id}
        />
      }

      {(!events || events.length < 1) &&
        <View style={styles.noParticipantsContainer}>
          <Text style={styles.noParticipantsText}> Er zijn geen deelnames om te stemmen. </Text>
        </View>
      }

      {(newRequests) &&
        <TouchableOpacity style={styles.confirmContainer} onPress={onHandleUpdate}>
          <Ionicons name='checkmark-circle' size={60} color='#50C878' />
        </TouchableOpacity>
      }

    </View>
  );
};

export default VoteView;
