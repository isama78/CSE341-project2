import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    // We only need the basic profile data, not the massive raw object
    return done(null, profile);
  }
));

// Serialization: We only store the username in the session (lightweight)
passport.serializeUser((user, done) => {
  console.log("Serializing user into session:", user.username);
  done(null, user.username); 
});

// Deserialization: We reconstruct the user object from the stored username
passport.deserializeUser((username, done) => {
  console.log("Deserializing user from session:", username);
  
  // Rebuilding a minimal user object for req.user
  const user = { 
    username: username, 
    displayName: username 
  };
  done(null, user);
});

export default passport;