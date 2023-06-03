import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import { getUniqueId } from '../../services/infoStorage';
import { BackendFetch } from '../../services/MoeslandApi';

const VotingItem = ({ data }) => {
    const [voting, setVoting] = useState(false);


    const onPressVote = async () => {
        if(voting) {
            return;
        }

        setVoting(true);

        const id = await getUniqueId();

        if(id){
            const body = {
                deviceId: id,
                category: data.category._id,
                participant: data._id
            }

            BackendFetch('/api/vote', 'POST', (data) => {
                if(data){
                    console.log("succesfully voted")
                }
            }, body)
        }

        setVoting(false);
    }

    return (
        <TouchableOpacity style={styles.votingItem} onPress={onPressVote}>
            <Text style={styles.voitingItemText}> Nr. {data.startnumber}, {data.name} </Text>
        </TouchableOpacity>
    );
};

export default VotingItem;