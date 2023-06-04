import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    categoryTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
    },
    votingItem: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        margin: 2,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    voitingItemText: {
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
    },
    votedItem: {
        borderColor: '#50C878',
    },
    ribbon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        width: 20,
        height: 20,
        backgroundColor: '#FFD700',
        transform: [{ rotate: '45deg' }],
        borderLeftColor: 'yellow', 
        zIndex: 1,
    },
    noParticipantsContainer: {
        flexGrow: 1,
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
    },
    noParticipantsText: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 5,
    },
});

export default styles;
