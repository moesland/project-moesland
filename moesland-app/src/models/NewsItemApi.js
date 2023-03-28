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
            const textSegments = content.ops.filter((op) => typeof op.insert === 'string');
            const contentModels = textSegments.map((op) => {
                const image = op.attributes && op.attributes.image ? op.attributes.image : null;
                return new NewsItemContentModel(
                    uuid.v4(),
                    op.insert,
                    op.attributes || {},
                    image
                );
            });

            // convert the date to DD/MM/YYYY format
            const inputDateString = item.date;
            const date = new Date(inputDateString);
            const formattedDate = date.toLocaleDateString('en-GB');

            return new NewsItemModel(
                uuid.v4(),
                formattedDate,
                item.title,
                item.bannerImage.$oid,
                contentModels
            );
        });

        // newsItems.forEach(newsItem => {
        //     console.log("Title:", newsItem.title)
        //     console.log("ContentSize:", newsItem.content.length)
        //     newsItem.content.forEach(contentItem => {
        //         console.log("Attributes:", contentItem.attributes)
        //     })
        // });

        return newsItems;
    } catch (error) {
        console.error(error);
        return [];
    }
}
