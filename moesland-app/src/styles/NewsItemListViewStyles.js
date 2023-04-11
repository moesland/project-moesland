import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row'
    },
    date: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    image: {
        width: '35%'
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