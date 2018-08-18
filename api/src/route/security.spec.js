//apiTest.js
const request = require('supertest');
const app = require('../../app');

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /api/user', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});