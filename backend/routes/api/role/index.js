const express = require('express');

const router = express.Router();
const Role = require('../../../models/role');

router.use(express.json());

router.post('/', (req, res) => {
  const { id, rolename } = req.body;

  const role = new Role({
    id,
    rolename,
  });

  role.save()
    .then((savedRole) => {
      res.status(200).send(`Role ${savedRole.rolename} saved successfully`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error saving role ${err}`);
    });
});

module.exports = router;
