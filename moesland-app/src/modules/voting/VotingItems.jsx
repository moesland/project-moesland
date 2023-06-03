import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import { getUniqueId } from '../../services/infoStorage';
import { BackendFetch } from '../../services/MoeslandApi';

const VotingItem = ({ data, votes, setVotes }) => {
    const [voting, setVoting] = useState(false);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        if (votes && data.event._id in votes && data.category._id in votes[data.event._id]) {
            const result = votes[data.event._id][data.category._id];
            if (result) {
                setVoted(result.participant === data._id);
            }
        };
    }, [votes, data]);

    const onPressVote = async () => {
        if (voting) {
            return;
        }

        setVoting(true);

        const id = await getUniqueId();

        if (id) {
            const body = {
                deviceId: id,
                category: data.category._id,
                participant: data._id,
                event: data.event._id
            }

            BackendFetch('/api/vote', 'POST', (data) => {
                if (data) {
                    console.log("succesfully voted")
                }
            }, body)
        }

        setVoting(false);
    }

    return (
        <TouchableOpacity style={[styles.votingItem, voted && styles.votedItem]} onPress={onPressVote}>
            {voted && <View style={[styles.ribbon]} />}
            <Text style={styles.voitingItemText}> Nr. {data.startnumber}, {data.name} </Text>
        </TouchableOpacity>
    );
};

export default VotingItem;