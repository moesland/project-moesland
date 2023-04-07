import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    itemContainer: {
        padding: 5
    },
    date: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    image: {
        width: 150,
        height: 100
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 5,
        marginRight: 5,
        opacity: 0.1,
    }
});