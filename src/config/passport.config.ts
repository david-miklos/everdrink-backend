const PassportConfig = () => ({
  defaultStrategy: process.env.PASSPORT_DEFAULT_STRATEGY,
  property: process.env.PASSPORT_PROPERTY,
  session: process.env.PASSPORT_SESSION,
});
export default PassportConfig;
