import React, { useState } from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import styles from '../../styles/votingStyles';

const VotingCategoryList = ({ data, votingItem }) => {
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
                    renderItem={votingItem}
                    keyExtractor={item => item._id}
                />
            }
        </View>
    );
};

export default VotingCategoryList;