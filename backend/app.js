const express = require('express');
const app = express();
const mongodb = require('./services/database')();

const seedRoles = require('./seed/rolesSeeder');
const seedUsers = require('./seed/userSeeder');

app.use('/', require('./routes'));

seedRoles();
seedUsers();

module.exports = app;