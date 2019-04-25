const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');

const app = express();

const CLIENT_ID = process.env.clientID;
const CLIENT_SECRET = process.env.clientSecret;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'https://eyad-jwt-authentication.herokuapp.com/auth/google/callback'
    },
    function(accessToken, refreshToken, profile) {
      console.log('accessToken: ', accessToken);
      console.log('accessToken: ', refreshToken);
      console.log('accessToken: ', profile);
      console.log('accessToken: ', accessToken);
    }
  )
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.get('/', (req, res) => {
  console.log('yo /');
  res.send('hi');
});

app.get('/login', (req, res) => {
  console.log('ack to login');
  res.send('login biatch');
});
