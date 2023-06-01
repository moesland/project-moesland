import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        height: Dimensions.get('window').width / 3 - 4,
    },
    photo: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default styles;
