import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white',
    flex: 1,
    margin: 5,
  },
  categoryTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  votingItem: {
    backgroundColor: 'white',
    flex: 1,
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
    width: '100%',
    top: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
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
  greenCheck: {
    right: 5,
    position: 'absolute',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#50C878',
    zIndex: 1,
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 105,
    right: 7,
  },
  changeRequested: {
    borderColor: '#FFD580',
  },
  eventContainer: {
    marginHorizontal: 2,
    marginBottom: '5%',
    minHeight: '100%',
  },
});

export default styles;
