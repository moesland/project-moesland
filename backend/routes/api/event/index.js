const express = require('express');
const { getAllEvents, getEventsByDate } = require('../../../repository/event');

const router = express.Router();

router.use(express.json());

// router.get('/', async (req, res) => {
//     try {
//       const { date } = req.query;
//       console.log(date);
//       if (date) {
//         const events = await getAllEvents();
//         const filteredEvents = events.filter(event => {
//             const eventDate = new Date(event.startDate);
//             const selectedDate = new Date(date);
//             return eventDate.getFullYear() === selectedDate.getFullYear()
//               && eventDate.getMonth() === selectedDate.getMonth()
//               && eventDate.getDate() === selectedDate.getDate();
//           });
//         return res.status(200).json(filteredEvents);
//       }
  
//       res.status(200).json(await getAllEvents());
//     } catch (err) {
//       res.status(500).send("Error fetching events");
//     }
//   });
  
router.get('/', async (req, res) => {
    try {
      const { date } = req.query;
      console.log(date);
      if (date) {
        const events = await getEventsByDate(date)
        console.log(events);
        return res.status(200).json(await getEventsByDate(date));
      }
  
      res.status(200).json(await getAllEvents());
    } catch (err) {
      res.status(500).send("Error fetching events");
    }
  });
  
module.exports = router;
