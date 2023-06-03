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
        if (votes && data.event._id in votes && data.category._id in votes[data.event._id]) {
            const result = votes[data.event._id][data.category._id];
            setVotedParticipant(result);
            if (result) {
                setVoted(result.participant === data._id);
            }
        };
    }

    const reAdjustVotingResults = (data) => {
       
    }

    const removeVote = async () => {
        if(votedParticipant) {
            await BackendFetch(`/api/vote/${votedParticipant._id}`, 'DELETE', (data) => {
                if (data) {
                    console.log("Successfully vote deleted")
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
                    console.log("Successfully voted")
                    reAdjustVotingResults(data)
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