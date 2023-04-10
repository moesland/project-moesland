import NewsItemModel from './NewsItemModel'
import NewsItemContentModel from './NewsItemContentModel'
import uuid from 'uuid';

export async function fetchNewsItems() {
    try {
        console.log('fetching')
        // Make a request to the API endpoint to retrieve news items
        // TODO: move ip to .env file in the future
        const REACT_APP_BACKEND_ROOT_URL = 'http://192.168.2.42:5000';
        const response = await fetch(REACT_APP_BACKEND_ROOT_URL + "/api/news-article/", { method: "GET" })
        const json = await response.json();

        const newsItems = json.map((item) => {

            const content = JSON.parse(item.content);

            let previousContentModel = null;
            const contentModels = content.ops.map((op) => {
                let image = null;

                // Check if the current op has an image
                if (op.insert && op.insert.image) {
                    image = op.insert.image;
                }

                const attributes = op.attributes || {};
                if (attributes.header || attributes.align) {
                    if (previousContentModel) {
                        const newAttributes = {
                            "header": attributes.header,
                            "align": attributes.align,
                            ...previousContentModel.attributes,
                        };
                        previousContentModel.attributes = newAttributes;
                    }
                }
                const contentModel = new NewsItemContentModel(
                    uuid.v4(),
                    op.insert,
                    attributes,
                    image
                );
                previousContentModel = contentModel;

                return contentModel;
            });

            // convert the date to DD/MM/YYYY format
            const inputDateString = item.date;
            const date = new Date(inputDateString);
            const formattedDate = date.toLocaleDateString('en-GB');

            return new NewsItemModel(
                uuid.v4(),
                formattedDate,
                item.title,
                item.bannerImage.$oid, // undefined at the moment
                contentModels
            );
        });

        return newsItems.reverse();
    } catch (error) {
        console.error(error);
        return [];
    }
}