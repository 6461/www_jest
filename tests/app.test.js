const request = require('supertest');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = require('../app');
const database = require('../database');
const Item = require('../models/itemModel');

describe('Test Mongoose database connection', () => {
  test('Test connection', (done) => {
    mongoose.connect(database.URL).then(() => {
      expect(mongoose.connection.readyState).toBe(1);
    });
    mongoose.disconnect();
    done();
  });
});

describe('Test routers', () => {
  test('GET request for list of all items', (done) => {
    request(app).get('/item/list').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
	done();
  });
});
