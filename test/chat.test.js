const { app } = require('../');
const { expect } = require('chai');
const request = require('supertest');

describe('todo list api integration', () => {
  describe('#POST / chat', () => {
    it('should chat', done => {
      request(app)
        .post('/chat')
        .send({ name: 'integration test' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});
