import { fetchFromMoesland } from "../services/ApiService";

const uploadUserImage = async (imageName, imageData, imageType) => {
  await fetchFromMoesland('/api/user-image/create', 'POST', null, {
    image: {
      name: imageName,
      data: imageData,
      contentType: imageType,
    },
  })
};

export { uploadUserImage };