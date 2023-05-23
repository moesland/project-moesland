import { BACKEND_URL } from '@env';
import { Buffer } from 'buffer';
import NewsItemModel from '../models/NewsItemModel';
import NewsItemContentModel from '../models/NewsItemContentModel';
import uuid from 'react-native-uuid';

const generateUUID = () => {
  return uuid.v4();
};

const fetchNewsItemsFromBackend = async () => {
  const response = await fetch(`${BACKEND_URL}/api/news-article`, { method: 'GET' });
  const json = await response.json();
  return json;
};

const parseContentOps = (content, previousContentModel) => content.ops.map((op) => {
  let image = null;

  // Check if the current op has an image
  if (op.insert && op.insert.image) {
    image = op.insert.image;
  }

  const attributes = op.attributes || {};
  if (attributes.header || attributes.align) {
    if (previousContentModel) {
      const newAttributes = {
        header: attributes.header,
        align: attributes.align,
        ...previousContentModel.attributes,
      };
      previousContentModel.attributes = newAttributes;
    }
  }
  const contentModel = new NewsItemContentModel(
    generateUUID(),
    op.insert,
    attributes,
    image,
  );
  previousContentModel = contentModel;

  return contentModel;
});

// converts a buffer object to base64 string
const convertImageToSourceString = (bannerImageData) => {
  const base64String = Buffer.from(bannerImageData.data).toString('base64');

  return {
    uri: `data:image/png;base64,${base64String}`,
  };
};

// convert a given date to DD/MM/YYYY format
const formatDateString = (inputDateString) => {
  const date = new Date(inputDateString);
  return date.toLocaleDateString('en-GB');
};

const fetchNewsItems = async () => {
  try {
    console.log('fetching News Items');
    const json = await fetchNewsItemsFromBackend();

    const newsItems = json.map((item) => {
      const content = JSON.parse(item.content);
      let previousContentModel = null;

      const contentModels = parseContentOps(content, previousContentModel);

      previousContentModel = null;
      return new NewsItemModel(
        generateUUID(),
        formatDateString(item.date),
        item.title,
        convertImageToSourceString(item.bannerImage.data),
        contentModels,
      );
    });

    // return reverse order to show the newest news item first
    return newsItems.reverse();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchNewsItems;
