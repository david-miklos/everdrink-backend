const JwtConfig = () => ({
  secret: process.env.JWT_SECRET_KEY,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
export default JwtConfig;
