const mongoose = require('mongoose');

const participationScema = new mongoose.Schema({
  startnumber: {
    type: Number,
    required: true,
    validate: {
      validator: async function (startnumber) {
        const count = await mongoose.models.Participation.countDocuments({
          startnumber,
          event: this.event,
        });

        return count === 0; 
      },
      message: 'Startnumber must be unique within the event',
    },
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParadeParticipationCategory',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});

module.exports = mongoose.model('Participation', participationScema);
