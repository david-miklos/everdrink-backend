import DatabaseConfig from './database.config';
import PassportConfig from "./passport.config";
import JwtConfig from "./jwt.config";
import MulterConfig from "./multer.config";
export default () => ({
  //environment: (process.env.NODE_ENVIRONMENT) ? process.env.NODE_ENVIRONMENT : 'development' ,
  //port: 3000,
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
