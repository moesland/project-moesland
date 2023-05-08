const mongoose = require('mongoose');

const UserImage = mongoose.model('UserImage');

module.exports = {
  async getUserImageById(id) {
    return await UserImage.findOne({ _id: { $eq: id } })
      .catch((err) => console.log('Cannot find user image by id in UserImage dataset.', err));
  },
  async getAllUserImages() {
    return await UserImage.find({}).populate('image')
      .catch((err) => console.error(err));
  },
  async createUserImage(image) {
    await image.save();

    const userImage = new UserImage({ image: image._id });

    await userImage.save();
  },
  async approveUserImage(userImage) {
    return UserImage.findOneAndUpdate({ _id: { $eq: userImage.id } }, { approvalStatus: 'approved' }, { new: true })
      .catch((err) => console.error(err));
  },
  async declineUserImage(userImage) {
    return UserImage.findOneAndUpdate({ _id: { $eq: userImage.id } }, { approvalStatus: 'declined' }, { new: true })
      .catch((err) => console.error(err));
  },
  async restoreUserImage(userImage) {
    return UserImage.findOneAndUpdate({ _id: { $eq: userImage.id } }, { approvalStatus: 'pending' }, { new: true })
      .catch((err) => console.error(err));
  },
  async deleteUserImage(userImage) {
    return UserImage.deleteOne(userImage)
      .catch((err) => console.error(err));
  },
};
