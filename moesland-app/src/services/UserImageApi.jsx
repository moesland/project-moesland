const uploadUserImage = async (imageName, imageData, imageType) => {
  await fetch(`${process.env.BACKEND_URL}/api/user-image/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: {
        name: imageName,
        data: imageData,
        contentType: imageType,
      },
    }),
  });
};

export { uploadUserImage };