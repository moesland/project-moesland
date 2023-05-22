import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import styles from '../styles/CalendarStyles';
import { testIDs } from '../constants/calendarTestIDs';
import fetchEvents from '../services/EventApi';
import {LocaleConfig} from 'react-native-calendars';

export default class AgendaScreen extends Component {
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
          const strTime = this.timeToString(time);

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
      var currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);

      while (currentDate <= endDate) {
        const strTime = this.timeToString(currentDate.getTime());

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
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
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

  renderItem = (reservation, isFirst) => {
    return (
      <View
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
      >
        <Text style={styles.time}>{reservation.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {reservation.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={styles.title}>{reservation.name}</Text>
        <Text style={styles.description}>{reservation.description}</Text>
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

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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