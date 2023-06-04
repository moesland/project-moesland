import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
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
  firstTitle: {
    fontSize: 16,
    color: 'black',
  },
  title: {
    fontSize: 14,
    color: '#6D869C',
  },
  firstDescription: {
    fontSize: 12,
    color: '#6D869C',
  },
  description: {
    fontSize: 12,
    color: '#8b9fb0',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
