import uuid from 'uuid';
import { BACKEND_URL } from '@env';
import NewsItemModel from './NewsItemModel';
import NewsItemContentModel from './NewsItemContentModel';

async function fetchNewsItemsFromBackend() {
  // TODO: move ip to .env file in the future
  const response = await fetch(`${BACKEND_URL}/api/news-article/`, { method: 'GET' });
  const json = await response.json();
  return json;
}

export async function fetchNewsItems() {
  try {
    console.log('fetching');
    const json = await fetchNewsItemsFromBackend();

    const newsItems = json.map((item) => {
      const content = JSON.parse(item.content);
      let previousContentModel = null;

      const contentModels = parseContentOps(content, previousContentModel);

      previousContentModel = null;
      return new NewsItemModel(
        uuid.v4(),
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
}

function parseContentOps(content, previousContentModel) {
  return content.ops.map((op) => {
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
      uuid.v4(),
      op.insert,
      attributes,
      image,
    );
    previousContentModel = contentModel;

    return contentModel;
  });
}

// converts a buffer object to base64 string
function convertImageToSourceString(bannerImageData) {
  const { Buffer } = require('buffer');
  const base64String = new Buffer(bannerImageData.data).toString('base64');

  return {
    uri: `data:image/png;base64,${base64String}`,
  };
}

// convert a given date to DD/MM/YYYY format
function formatDateString(inputDateString) {
  const date = new Date(inputDateString);
  return date.toLocaleDateString('en-GB');
}
