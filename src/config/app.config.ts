import DatabaseConfig from './database.config';
import PassportConfig from "./passport.config";
import JwtConfig from "./jwt.config";
import MulterConfig from "./multer.config";
export default () => ({
  database: {
    ...DatabaseConfig(),
  },
  passport: {
    ...PassportConfig(),
  },
  jwt: {
    ...JwtConfig(),
  },
  multer: {
    ...MulterConfig(),
  },
});
