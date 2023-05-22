import EventModel from '../models/EventModel';
import uuid from 'react-native-uuid';

const generateUUID = () => {
  return uuid.v4();
};

const fetchEventsFromBackend = async () => {
  const response = await fetch(`http://192.168.2.47:5000/api/event/`, { method: 'GET' });
  const json = await response.json();
  return json;
};

const fetchEvents = async () => {
  try {
    console.log('fetching Events');
    const json = await fetchEventsFromBackend();

    const events = json.map((item) => {
      return new EventModel(
        item._id,
        item.title,
        item.description,
        new Date(item.startdate),
        new Date(item.enddate),
        item.location,
      );
    });
    return events

  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchEvents;
