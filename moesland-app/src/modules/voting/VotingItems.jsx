import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import { getUniqueId } from '../../services/infoStorage';

const VotingItem = ({ data }) => {

    const onPressVote = async () => {
        const id = await getUniqueId();
        if(id){
            
        }
    }

    return (
        <TouchableOpacity style={styles.votingItem} onPress={onPressVote}>
            <Text style={styles.voitingItemText}> Nr. {data.startnumber}, {data.name} </Text>
        </TouchableOpacity>
    );
};

export default VotingItem;