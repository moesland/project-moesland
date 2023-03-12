import Item from '../models/NewsItemModel.js';

// TODO: replace items with data from back-end
const items = [
  new Item(1, "07-02-2023", 'Startnummers Grote Moeslandse Optocht', 'McDonald\'s stapt in Frankrijk tijdelijk over op friet van biet, wortel en pastinaak', require('../../assets/examples/example_image_1.png')),
  new Item(2, "30-01-2023",  'Sleuteloverdracht', 'Dit zijn de antwoorden op jullie vragen over het postcovidsyndroom', require('../../assets/examples/example_image_2.png')),
  new Item(3, "26-01-2023", 'Verslag Pronkzitting 2023', 'Duizend jaar oude goudschat gevonden in Hoogwoud', require('../../assets/examples/example_image_3.png')),
  new Item(4, "16-01-2023", 'Bezorging Moesblad \'23', 'Duizend jaar oude goudschat gevonden in Hoogwoud', require('../../assets/examples/example_image_4.png')),
  new Item(5, "07-12-2022", 'Digitale kaartverkoop Pronkzitting', 'Duizend jaar oude goudschat gevonden in Hoogwoud', require('../../assets/examples/example_image_5.png')),
  new Item(6, "07-12-2022", 'Ontwerp jij het logo voor het 66-jarig bestaan?', 'Duizend jaar oude goudschat gevonden in Hoogwoud', require('../../assets/examples/example_image_6.png')),
];

export default class NewsItemController {
  static getAllItems() {
    return items;
  }
}