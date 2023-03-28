import NewsItemModel from './NewsItemModel'
import NewsItemContentModel from './NewsItemContentModel'

export async function fetchNewsItems(apiUrl) {
    try {
        console.log('fetching')
        // Make a request to the API endpoint to retrieve news items
        // TODO: move ip to .env file in the future
        const REACT_APP_BACKEND_ROOT_URL = 'http://192.168.2.42:5000';
        const response = await fetch(REACT_APP_BACKEND_ROOT_URL + "/api/news-article/", { method: "GET" })
        const data = await response.json()
        console.log(data)

        // Return the array of NewsItemModel objects
        return newsItems;
    } catch (error) {
        console.error(error);
    }
}