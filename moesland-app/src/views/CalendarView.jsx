import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import styles from '../styles/views/CalendarViewStyles';
import testIDs from '../constants/calendarTestIDs';
import fetchEvents from '../services/EventApi';
import { timeToString } from '../utilities/HelperFunctions';


export default class AgendaScreen extends PureComponent {
  state = {
    items: undefined
  };

  componentDidMount() {
    this.loadEvents();
  }

  async loadEvents() {
    try {
      const events = await fetchEvents();

      const items = {};
      events.forEach((event) => {
        const startDate = event.startdate.getTime();
        const endDate = event.enddate.getTime();

        for (let time = startDate; time <= endDate; time += 24 * 60 * 60 * 1000) {
          const strTime = timeToString(time);

          if (!items[strTime]) {
            items[strTime] = [];
          }

          const eventExists = items[strTime].some((event) => {
            return (
              event.name === event.title &&
              event.description === event.description &&
              event.startDate.getTime() === event.startdate.getTime() &&
              event.endDate.getTime() === event.enddate.getTime() &&
              event.location === event.location
            );
          });

          if (!eventExists) {
            items[strTime].push({
              name: event.title,
              description: event.description,
              startDate: event.startdate,
              endDate: event.enddate,
              location: event.location,
            });
          }
        }
      });

      // Fill dates with [] when no events exist
      const dates = Object.keys(items);
      let currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);

      while (currentDate <= endDate) {
        const strTime = timeToString(currentDate.getTime());

        if (!dates.includes(strTime)) {
          items[strTime] = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.setState({
        items,
      });
    } catch (error) {
      console.error(error);
      // Handle the error condition if needed
    }
  }

  examples = fetchEvents()

  render() {
    const { items } = this.state;
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={this.loadItems}
        selected={new Date().toString()}
        minDate='2023-01-01'
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      />
    );
  }

  renderItem = (eventItem) => {
    let startTime = eventItem.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let endTime = eventItem.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return (
      <View
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: eventItem.height }]}
      >
        <View style={styles.itemHeader}>
          <Text style={styles.time}>{startTime} - {endTime}</Text>
          <Text style={styles.time}>{eventItem.location}</Text>
        </View>
        <Text style={styles.title}>{eventItem.name}</Text>
        <Text style={styles.description}>{eventItem.description}</Text>
      </View>
    );
  }

  renderEmptyDate = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  }

  rowHasChanged = (prevItem, newItem) => {
    return prevItem.name !== newItem.name;
  }
}

LocaleConfig.locales['nl'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mrt.', 'Apr.', 'Mei', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dec.'],
  dayNames: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
  dayNamesShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
  today: "Vandaag"
};
LocaleConfig.defaultLocale = 'nl';