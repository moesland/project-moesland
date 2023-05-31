import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';

const VotingItem = ({ item }) => {
    
    return (
        <TouchableOpacity style={styles.votingItem}>
            <Text style={styles.voitingItemText}> Name </Text>
        </TouchableOpacity>
    );
};

export default VotingItem;