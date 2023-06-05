import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import VotingItem from './VotingItems';
import { LinearGradient } from 'expo-linear-gradient';

const VotingCategoryList = ({ data, votes, setVotes }) => {
    const [display, setDisplay] = useState(false);

    const toggleList = () => {
        setDisplay(!display);
    }

    return (
        <View>
            <TouchableOpacity style={[styles.categoryContainer, { backgroundColor: `${data.color}95` }]} onPress={toggleList}>
                <Text style={styles.categoryTitle}>{data.name}</Text>
            </TouchableOpacity>

            {display &&
                <FlatList
                    data={data.participates}
                    renderItem={({ item }) => <VotingItem data={item} votes={votes} setVotes={setVotes} />}
                    keyExtractor={item => item._id}
                />
            }
        </View>
    );
};

export default VotingCategoryList;