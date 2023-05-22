import React, { Component } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import styles from '../styles/CalendarStyles';
import { testIDs } from '../constants/calendarTestIDs';
import fetchEvents from '../services/EventApi';

export default class AgendaScreen extends Component {
  state = {
    items: undefined
  };

  componentDidMount() {
    this.loadEvents();
  }

  async loadEvents() {
    try {
      const examples = await fetchEvents();

      const items = {};
      examples.forEach((example) => {
        const startDate = example.startdate.getTime();
        const endDate = example.enddate.getTime();

        for (let time = startDate; time <= endDate; time += 24 * 60 * 60 * 1000) {
          const strTime = this.timeToString(time);

          if (!items[strTime]) {
            items[strTime] = [];
          }

          const eventExists = items[strTime].some((event) => {
            return (
              event.name === example.title &&
              event.startDate.getTime() === example.startdate.getTime() &&
              event.endDate.getTime() === example.enddate.getTime() &&
              event.location === example.location
            );
          });

          if (!eventExists) {
            items[strTime].push({
              name: example.title,
              description: example.description,
              startDate: example.startdate,
              endDate: example.enddate,
              location: example.location,
            });
          }
        }
      });

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
    // first event of the day is highlighted
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.description)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>.</Text>
      </View>
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