import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../styles/votingStyles';
import { getUniqueId } from '../../services/infoStorage';

const VotingItem = ({ data, votes, voteRequests, setVoteRequests }) => {
    const [voted, setVoted] = useState(false);
    const [changeRequested, setChangeRequested] = useState(false);
    const [votedParticipant, setVotedParticipant] = useState(null);

    useEffect(() => {
        votingResult();
        requestResult();
    }, [votes, voteRequests, data]);

    const votingResult = () => {
        if (votes) {
            if (votes[data.event._id] && votes[data.event._id][data.category._id]) {
                const result = votes[data.event._id][data.category._id];
        
                setVotedParticipant(result);
                setVoted(result.participant === data._id);
            } else {
                setVoted(false);
            }
        }
        
    }

    const requestResult = () => {
        if(voteRequests){
            if (voteRequests[data.event._id] && voteRequests[data.event._id][data.category._id]) {
                const result = voteRequests[data.event._id][data.category._id];
                setChangeRequested(result.participant === data._id);
            } else {
                setChangeRequested(false);
            }
        }
    }

    const onHandleRequest = async () => {
        const id = await getUniqueId();

        if(!id) {
            return;
        }

        const voteRequest = voteRequests[data.event._id] && voteRequests[data.event._id][data.category._id] || null;
        const requestTransaction = setupRequest(voteRequest);

        addRequest(id, voteRequest, requestTransaction);
        deleteRequest(voteRequest, requestTransaction);
        setVoteRequests(requestTransaction);
    }

    const setupRequest = (voteRequest) => {
        const updatedVoteRequest = { ...voteRequests };

        if(voteRequest === null) {
            if (updatedVoteRequest[data.event._id] === undefined) {
                updatedVoteRequest[data.event._id] = {}
            }
        }

        return updatedVoteRequest;
    }

    const addRequest = (id, voteRequest, requestTransaction) => {
        if (!voteRequest || voteRequest.participant !== data._id) {
            const method = votedParticipant ? (voted ? 'delete' : 'edit') : 'post';

            requestTransaction[data.event._id][data.category._id] = {
                _id: votedParticipant ? votedParticipant._id : null,
                deviceId: id,
                category: data.category._id,
                participant: data._id,
                event: data.event._id,
                method
            };
        } 
    }

    const deleteRequest = (voteRequest, requestTransaction) => {
        if (voteRequest && voteRequest.participant === data._id){
            delete requestTransaction[data.event._id][data.category._id];
        }
    }


    return (
        <TouchableOpacity style={[styles.votingItem, voted && styles.votedItem, changeRequested && styles.changeRequested]} onPress={onHandleRequest}>
            {voted && <Text style={[styles.greenCheck]} > ✓ </Text>}
            <Text style={styles.voitingItemText}> Nr. {data.startnumber}, {data.name} </Text>
        </TouchableOpacity>
    );
};

export default VotingItem;