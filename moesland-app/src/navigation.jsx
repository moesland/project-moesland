import CustomNavigation, { createStack } from './modules/menu/CustomNavigation';

import MediaView from './views/MediaView';
import AlbumView from './views/AlbumView';
import PhotoView from './views/PhotoView';
import CalendarView from './views/CalendarView';
import VotingView from './views/VotingView';

import NewsItemListView from './views/NewsItemListView';
import NewsItemDetailView from './views/NewsItemDetailView';
import { Tab } from './modules/menu/CustomNavigation';

const IconTabList = [
    { routeName: 'Nieuws', image: 'newspaper-outline', focusImage: 'newspaper' },
    { routeName: 'Agenda', image: 'calendar-outline', focusImage: 'calendar' },
    { routeName: 'Media', image: 'camera-outline', focusImage: 'camera' },
    { routeName: 'Stemmen', image: 'thumbs-up-outline', focusImage: 'thumbs-up' },
    { routeName: 'Contact', image: 'mail-outline', focusImage: 'mail' }
];

const NewsStack = createStack([
    { name: 'NewsItemListView', component: NewsItemListView },
    { name: 'NewsItemDetailView', component: NewsItemDetailView },
]);

const MediaStack = createStack([
    { name: 'MediaView', component: MediaView },
    { name: 'AlbumView', component: AlbumView },
    { name: 'PhotoView', component: PhotoView },
]);

export const MoeslandNavigation = () => {
    return (
        <CustomNavigation initialRouteName="Nieuws" IconTabList={IconTabList} >
            <Tab.Screen name="Nieuws" component={NewsStack} />
            <Tab.Screen name="Agenda" component={CalendarView} />
            <Tab.Screen name="Media" component={MediaStack} />
            <Tab.Screen name="Stemmen" component={VotingView} />
        </CustomNavigation>
    )
}