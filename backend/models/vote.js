const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participation',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParticipationCategory',
  },
  deviceId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

voteSchema.index({ category: 1, deviceId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
