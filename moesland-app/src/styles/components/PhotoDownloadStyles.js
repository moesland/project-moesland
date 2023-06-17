import { StyleSheet } from 'react-native';
import { COLOR_WHITE, MOESLAND_GREEN } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#dcdcdc',
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 150,
    backgroundColor: MOESLAND_GREEN,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLOR_WHITE,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
