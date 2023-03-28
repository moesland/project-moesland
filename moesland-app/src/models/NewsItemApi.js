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
            const text = content.ops.map((op) => op.insert).join('');
            const attributes = content.ops.reduce((attrs, op) => {
                Object.keys(op.attributes || {}).forEach((key) => {
                    attrs[key] = op.attributes[key];
                });
                return attrs;
            }, {});

            // convert the date to DD/MM/YYYY format
            const inputDateString = item.date;
            const date = new Date(inputDateString);
            const formattedDate = date.toLocaleDateString('en-GB');

            return new NewsItemModel(
                uuid.v4(),
                formattedDate,
                item.title,
                item.bannerImage.$oid,
                new NewsItemContentModel(item._id.$oid, text, attributes)
            );
        });



        // Assuming your array of newsItems is called "newsItems"
        newsItems.forEach(newsItem => {
            console.log(newsItem)
            //console.log(newsItem.content.attributes);
            
        });

        return newsItems;
    } catch (error) {
        console.error(error);
        return [];
    }
}