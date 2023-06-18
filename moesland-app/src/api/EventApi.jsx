import EventModel from '../models/EventModel';
import { fetchFromMoesland } from '../services/ApiService';

const fetchEventsFromBackend = async () => {
  const data = await fetchFromMoesland('/api/event/', 'GET');
  return data;
};

const fetchEvents = async () => {
  try {
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
