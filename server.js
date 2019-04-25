const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');

const app = express();

const CLIENT_ID = '358306011016-ed2nbckg5f3d0h4run8lhqo7cdkfeoag.apps.googleusercontent.com';
const CLIENT_SECRET = '-I1cn0Vlq0SwctD9IdKo76mR';

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile) {
      console.log('accessToken: ', accessToken);
      console.log('accessToken: ', refreshToken);
      console.log('accessToken: ', profile);
      console.log('accessToken: ', accessToken);
    }
  )
);

app.listen(3000, () => console.log('listening on port 3000'));

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }),
  function(req, res) {
    res.redirect('http://localhost:3000');
  }
);

app.get('/', (req, res) => {
  console.log('yo /');
  res.send('hi');
});
