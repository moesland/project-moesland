import { calculateDistance,  getCurrentLocation } from '../services/LocationService';
import { getUniqueId } from '../services/InfoStorage';
import { fetchFromMoesland } from '../services/ApiService';

export const sendVoteRequest = async (voteRequests) => {
    let result = false;

    const formattedRequests = separateVoteRequests(voteRequests);

    const deleteRequests = formattedRequests.deleteRequests;
    const postRequests = formattedRequests.postRequests

    //console.log("Post Requests:", postRequests);
    //console.log("Delete Requests:", deleteRequests);

    if(deleteRequests && deleteRequests.length > 0) {
        await fetchFromMoesland('/api/vote/bulk', 'POST', (data) => {
            if(data){
                result = true
                //console.log("Bulk vote delete");
            }
        }, {operation: 'delete', votes: deleteRequests});
    }

    if(postRequests && postRequests.length > 0) {
        await fetchFromMoesland('/api/vote/bulk', 'POST', (data) => {
            if(data) {
                result = true
                //console.log("Bulk vote add");
            }
        }, {operation: 'add', votes: postRequests});
    }

    return result;
}

export const fetchEventData = async () => {
    const location = await getCurrentLocation();
    const data = await fetchFromMoesland('/api/event/participants', 'GET');

    return formatEvents(data, location.coords);
}

export const fetchVoteData = async () => {
    const id = await getUniqueId();
    const data = await fetchFromMoesland(`/api/vote?deviceId=${id}`, 'GET');

    return formatVotes(data);
}

const separateVoteRequests = (voteRequests) => {
    const postRequests = [];
    const deleteRequests = [];
    
    //console.log(voteRequests);

    for (const voteId in voteRequests) {
        const vote = voteRequests[voteId];
        for (const requestId in vote) {
            const { method, _id, ...postRequest } = vote[requestId];
            
            switch(method) {
                case "post":  
                    postRequests.push(postRequest);
                    break;
                case "delete":
                    deleteRequests.push(_id);
                    break;
                case "edit":
                    postRequests.push(postRequest);
                    deleteRequests.push(_id);
                    break;
            }


        }
    }

    return { postRequests, deleteRequests };
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