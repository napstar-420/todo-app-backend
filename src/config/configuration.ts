export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.APP_URL}/api/auth/google/callback`,
    scopes: ['profile', 'email'],
  },
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
});
