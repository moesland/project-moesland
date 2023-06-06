import { calculateDistance, getCurrentLocation } from './locationService';
import { getUniqueId } from './infoStorage';
import { fetchDataFromBackend } from './MoeslandApi';

export const fetchEventData = async () => {
    const location = await getCurrentLocation();
    const data = await fetchDataFromBackend('/api/event/participants', 'GET');

    return formatEvents(data, location);
}

export const fetchVoteData = async () => {
    const id = await getUniqueId();
    const data = await fetchDataFromBackend(`/api/vote?deviceId=${id}`, 'GET');

    return formatVotes(data);
}

const formatEvents = (data, location) => {
    return data.filter((event) => {
        if (event.isParade === true && event.latitude !== undefined && event.longitude !== undefined) {
            if (event.radius === 0) {
                return true; // Infinite radius, include the event
            } else {
                const distance = calculateDistance(event.latitude, event.longitude, location.latitude, location.longitude);
                return distance <= event.radius;
            }
        }
        return false;
    })
}

const formatVotes = (data) => {
    return data.reduce((result, vote) => {
        const eventId = vote.event;
        const categoryId = vote.category;

        if (!result[eventId]) {
            result[eventId] = {};
        }

        if (!result[eventId][categoryId]) {
            result[eventId][categoryId] = vote;
        }

        return result;
    }, {});
}