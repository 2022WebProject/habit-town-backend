import dotenv from "dotenv";
dotenv.config();
// console.log(process.env);

const findEnv = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is not defined in .env file`);
  }
  return value;
};

export const config = {
  jwt: {
    secretKey: findEnv("SECRET_KEY"),
    expiresIn: parseInt(findEnv("JWT_EXPIRES_IN", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(findEnv("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(findEnv("PORT", 8080)),
  },
  db: {
    host: findEnv("DB_HOST"),
    // user: findEnv("DB_USER"),
    // database: findEnv("DB_DATABASE"),
    // password: findEnv("DB_PASSWORD"),
  },
};
