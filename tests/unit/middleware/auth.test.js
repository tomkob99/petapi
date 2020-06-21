// const {User} = require('../../../models/user');
// const auth = require('../../../middleware/auth');
// const mongoose = require('mongoose');

const usera = require('../../../models/usera');
const auth = require('../../../middleware/auth');

describe('auth middleware', () => {
  it('should populate req.user.with the payload of a valid JWT', () => {
    // const user = {
    //   _id: mongoose.Types.ObjectId().toHexString(),
    //   isAdmin: true
    // };
    // const token = User(user).generateAuthToken();
    // const req = {
    //   header: jest.fn().mockReturnValue(token)
    // };
    // const res = {};
    // const next = jest.fn();

    // auth(req, res, next);

    // expect(req.user).toBeDefined(); 
    const payload = { 
      user_name: 'usera1', 
      isAdmin: true
    };
    const token = usera.generateAuthToken(payload);
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeDefined(); 
  });
});