import React, {Component} from 'react';
import {Alert, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import styles from '../styles/CalendarStyles';
import { testIDs } from '../constants/calendarTestIDs';
import fetchEvents from '../services/EventApi';

export default class AgendaScreen extends Component {
  state = {
    items: undefined
  };

  examples = [
    {
      id: 1,
      title: 'Festival van de Zon',
      description: 'Een vierdaags muziekfestival met optredens van nationale en internationale artiesten.',
      startDate: new Date(2023, 4, 10),
      endDate: new Date(2023, 4, 10),
      location: 'Amsterdam'
    },
    {
      id: 2,
      title: 'Tulpenfestival',
      description: 'Een jaarlijks festival ter ere van de kleurrijke tulpenvelden in de Bollenstreek.',
      startDate: new Date(2023, 4, 15),
      endDate: new Date(2023, 4, 15),
      location: 'Lisse'
    },
    {
      id: 3,
      title: 'Koningsdag Vrijmarkt',
      description: 'Een bruisende vrijmarkt op Koningsdag waar mensen hun tweedehands spullen verkopen.',
      startDate: new Date(2023, 4, 27),
      endDate: new Date(2023, 4, 27),
      location: 'Utrecht'
    },
    {
      id: 4,
      title: 'Kermis Rotterdam',
      description: 'Een grote kermis met attracties, spelletjes en lekker eten in het centrum van Rotterdam.',
      startDate: new Date(2023, 4, 21),
      endDate: new Date(2023, 4, 21),
      location: 'Rotterdam'
    },
    {
      id: 5,
      title: 'Amsterdam Light Festival',
      description: 'Een betoverend lichtkunstfestival waarbij kunstwerken zijn verlicht in de grachten van Amsterdam.',
      startDate: new Date(2023, 4, 21),
      endDate: new Date(2023, 4, 21),
      location: 'Amsterdam'
    }
  ];

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

  loadItems = (day) => {
    const items = this.state.items || {};

    let printing = fetchEvents()

    this.examples.forEach((example) => {
      const startDate = example.startDate.getTime();
      const endDate = example.endDate.getTime();

      for (let time = startDate; time <= endDate; time += 24 * 60 * 60 * 1000) {
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
        }

        const eventExists = items[strTime].some((event) => {
          return (
            event.name === example.title &&
            event.startDate.getTime() === example.startDate.getTime() &&
            event.endDate.getTime() === example.endDate.getTime() &&
            event.location === example.location
          );
        });

        if (!eventExists) {
          items[strTime].push({
            name: example.title,
            description: example.description,
            startDate: example.startDate,
            endDate: example.endDate,
            location: example.location,
          });
        }
      }
    });

    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    this.setState({
      items: newItems,
    });
  };
  
  renderItem = (reservation, isFirst) => {
    // first event of the day is highlighted
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.description)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
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