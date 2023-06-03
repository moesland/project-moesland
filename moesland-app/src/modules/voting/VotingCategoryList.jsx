import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import VotingItem from './VotingItems';

const VotingCategoryList = ({data, votes, setVotes}) => {
    const [display, setDisplay] = useState(false);

    const toggleList = () => {
        setDisplay(!display);
    }

    return (
        <ScrollView>
            <TouchableOpacity style={[styles.categoryContainer, {backgroundColor: `${data.color}95`}]} onPress={toggleList}>
                <Text style={styles.categoryTitle}>{data.name}</Text>
            </TouchableOpacity>

            {display &&
                <FlatList
                    data={data.participates}
                    renderItem={({ item }) => <VotingItem data={item} votes={votes} setVotes={setVotes} />}
                    extraData={item => item._id}
                />
            }
        </ScrollView>
    );
};

export default VotingCategoryList;