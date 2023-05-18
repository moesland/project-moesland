const mongoose = require('mongoose');

const participationScema = new mongoose.Schema({
    startnumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParadeParticipationCategory',
    },
    Event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
});

module.exports = mongoose.model('Participation', participationScema);
