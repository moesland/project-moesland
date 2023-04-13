import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row'
    },
    date: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-start',
        marginBottom: 10,
        padding: 2,
    },
    image: {
        width: '35%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14
    },
    textcontainer: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 5,
        marginRight: 5,
        opacity: 0.1,
    }
});