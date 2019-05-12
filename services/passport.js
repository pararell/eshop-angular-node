const passport        = require("passport");
const GoogleStrategy  = require("passport-google-oauth20").Strategy;
const LocalStrategy   = require("passport-local").Strategy;
const mongoose        = require("mongoose");
const keys            = require("../config/keys");
const User            = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    });
  })
);

/**
 * Sign in using Google
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id, email: profile.emails && profile.emails.length ? profile.emails[0].value : "", name: profile.displayName }).save();

      done(null, user);
    }
  )
);
