import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        height: Dimensions.get('window').width / 3 - 4,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 6,
        textAlign: 'center',
    },
    photo: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default styles;
