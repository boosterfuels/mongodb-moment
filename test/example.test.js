'use strict';

const assert = require('assert');
const co = require('co');
const mongodb = require('mongodb');

describe('mongodb-moment', function() {
  let db;

  before(function(done) {
    co(function*() {
      db = yield mongodb.MongoClient.
        connect('mongodb://localhost:27017/moment');
      yield db.dropDatabase();
      done();
    }).catch(done)
  });

  it('example', function(done) {
    const moment = require('moment');
    require('mongodb-moment')(moment);

    co(function*() {
      const id = new mongodb.ObjectId();
      yield db.collection('test').
        insertOne({ _id: id, createdAt: moment.utc('2011-06-01') });

      const res = yield db.collection('test').findOne();
      assert.deepEqual(res, { _id: id, createdAt: new Date('2011-06-01') });
      done();
    }).catch(done);
  });
});
