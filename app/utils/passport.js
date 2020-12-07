// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// module.exports = function (passport) {
//   passport.use(
//     new GoogleStrategy({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/user/google/callback'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const newUser = {
//         googleId: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         image: profile.photos[0].value
//       };
//       try {
//         let user = await User.findOne({
//           googleId: profile.id
//         });
//         if (user) {
//           done(null, user);
//         } else {
//           user = await User.create(newUser);
//           done(null, user);
//         }
//       } catch (err) {
//         throw error;
//       }
//     })
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   // change the User.findById here to postgres database find by id
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
// };
