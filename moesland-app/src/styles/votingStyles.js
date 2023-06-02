import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    categoryTitle:{
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
    },
    votingItem:{
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        margin: 2,
        marginLeft: 5,
        marginRight: 5
    },
    voitingItemText:{
        textAlign: 'center',
    },
    paradeTitle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        marginVertical: 18,
        fontWeight: 'bold',
    },
    paradeTitleContainer: {
    }
});

export default styles;
