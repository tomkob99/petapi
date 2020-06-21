const usera = require('../../../models/usera');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('usera.generateAuthToken', () => {
  it('should return valid JWT', () => {
    const payload = { 
      user_name: 'usera1', 
      isAdmin: true
    };
    console.log(payload);
    // const user = new User({ _id: '5eadf79e597bc56bfce4712f', isAdmin: true });
    // console.log('user._id=', user._id);
    const token = usera.generateAuthToken(payload);
    // console.log('token=', token);
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    console.log(decoded);
    // expect(decoded).toMatchObject({ _id: '5eadf79e597bc56bfce4712f', isAdmin: true });
    expect(decoded).toMatchObject(payload);
  });
});