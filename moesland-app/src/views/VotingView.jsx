import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, View, Text } from 'react-native';
import VotingCategoryList from '../modules/voting/VotingCategoryList';
import styles from '../styles/votingStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchEventData, fetchVoteData } from '../services/VoteApi';

const VoteView = () => {
  const [events, setEvents] = useState([]);
  const [votes, setVotes] = useState({});
  const [newVotes, setNewVotes] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await fetchEventData();
      setEvents(data);
    }
    
    fetchEvent();
  }, []);

  useEffect(() => {
    if (events) {
      const fetchVotes = async () => {
        const data = await fetchVoteData();
        setVotes(data);
      }
    
      fetchVotes();
    }
  }, [events]);

  const eventItem = ({item}) => {
    return (
      <View style={styles.paradeContainer} key={item._id}>
        <View style={styles.paradeTitleContainer}>
          <Text style={styles.paradeTitle}>{item.title}</Text>
        </View>

        {item.categories.map(category => (
          <VotingCategoryList key={category._id} data={category} votes={votes} setVotes={setVotes} />
        ))}

      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.paradeContainer}>
      {events &&
        <FlatList
          data={events}
          renderItem={eventItem}
          keyExtractor={event => event._id}
        />
      }

      {(!events || events.length > 1) &&
        <View style={styles.noParticipantsContainer}>
          <Text style={styles.noParticipantsText}> Er zijn geen deelnames om te stemmen. </Text>
        </View>
      }

      {(true) && 
        <TouchableOpacity style={styles.confirmContainer}>
            <Ionicons name='checkmark-circle' size={60} color='#50C878' />
        </TouchableOpacity>
      }

    </SafeAreaView>
  );
};

export default VoteView;
