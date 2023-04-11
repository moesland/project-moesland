const mongoose = require('mongoose');

const userImageSchema = mongoose.Schema({
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending',
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true
    }
});

module.exports = mongoose.model('UserImage', userImageSchema);