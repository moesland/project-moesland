import NewsItemModel from './NewsItemModel'
import NewsItemContentModel from './NewsItemContentModel'

export async function fetchNewsItems(apiUrl) {
    try {
        console.log('fetching')
        // Make a request to the API endpoint to retrieve news items
        const response = await fetch('./apitest.json');
        // Parse the response data as JSON format
        const json = await response.json();
        // Map the JSON data to an array of NewsItemModel objects
        const newsItems = json.newsItems.map((item) => {
            // Map each content item in the news item to a ContentModel object
            const content = item.content.map((contentItem) => {
                return new NewsItemContentModel(contentItem.id, contentItem.text, contentItem.image);
            });
            // Return a new NewsItemModel object for each news item
            return new NewsItemModel(item.id, item.date, item.title, item.bannerImage, content);
        });
        // Return the array of NewsItemModel objects
        return newsItems;
    } catch (error) {
        console.error(error);
    }
}