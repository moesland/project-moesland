import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.1,
  },
  time: {
    fontSize: 12,
    color: '#8b9fb0',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#4b5963',
  },
  description: {
    fontSize: 12,
    color: '#8b9fb0',
  },
});

export default styles;
