import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import styles from '../../styles/votingStyles';
import VotingItem from './VotingItems';

const VotingCategoryList = () => {
    const [display, setDisplay] = useState(false);

    const toggleList = () => {
        setDisplay(!display);
    }

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
      

    return (
        <ScrollView>
            <TouchableOpacity style={styles.categoryContainer} onPress={toggleList}>
                <Text style={styles.categoryTitle}>category naam</Text>
            </TouchableOpacity>

            {display &&
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <VotingItem />}
                    extraData={item => item.id}
                />
            }
        </ScrollView>
    );
};

export default VotingCategoryList;