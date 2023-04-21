import { StyleSheet } from 'react-native';
import { COLOR_WHITE, MOESLAND_GREEN } from '../constants/colors';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    maxHeight: 40,
    width: 120,
    backgroundColor: MOESLAND_GREEN,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 'auto',
    borderRadius: 6,
  },
  text: {
    color: COLOR_WHITE,
    fontSize: 16,
    textAlign: 'center',
  },
});
