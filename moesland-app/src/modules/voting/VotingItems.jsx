import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import { getUniqueId } from '../../services/infoStorage';
import { BackendFetch } from '../../services/MoeslandApi';

const VotingItem = ({ data, votes, setVotes }) => {
    const [voted, setVoted] = useState(false);
    const [votedParticipant, setVotedParticipant] = useState(null)

    useEffect(() => {
        votingResult();
    }, [votes, data]);

    const votingResult = () => {
        if (votes) {
            let result = null;

            if (votes[data.event._id]) {
                result = votes[data.event._id][data.category._id];
            }

            setVotedParticipant(result);

            if (result) {
                setVoted(result.participant === data._id);
            } else {
                setVoted(false);
            }
        }
    }

    const removeVote = async () => {
        if (votedParticipant) {
            await BackendFetch(`/api/vote/${votedParticipant._id}`, 'DELETE', (data) => {
                if (data) {
                    console.log("Successfully vote deleted")
                    const updatedVotes = { ...votes };
                    delete updatedVotes[data.event][data.category];
                    setVotes(updatedVotes);
                }
            })
        }

    }

    const addVote = async () => {
        const id = await getUniqueId();

        if (id && !voted) {
            const body = {
                deviceId: id,
                category: data.category._id,
                participant: data._id,
                event: data.event._id
            }

            await BackendFetch('/api/vote', 'POST', (data) => {
                if (data) {
                    console.log("Successfully voted");
                    const updatedVotes = { ...votes };
                    if (updatedVotes[data.event] == undefined) {
                        updatedVotes[data.event] = {}
                    }
                    updatedVotes[data.event][data.category] = data;
                    setVotes(updatedVotes);
                }
            }, body)
        }
    }

    const onPressVote = async () => {
        await removeVote();
        await addVote();
    }

    return (
        <TouchableOpacity style={[styles.votingItem, voted && styles.votedItem]} onPress={onPressVote}>
            {voted && <View style={[styles.ribbon]} />}
            <Text style={styles.voitingItemText}> Nr. {data.startnumber}, {data.name} </Text>
        </TouchableOpacity>
    );
};

export default VotingItem;