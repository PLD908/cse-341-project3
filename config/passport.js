const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = new User({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
                await user.save();
            }
            return done(null, user);
        }
    )
);

// Save user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Get user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});