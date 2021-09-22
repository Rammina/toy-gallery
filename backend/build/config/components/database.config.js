Object.defineProperty(exports, '__esModule', { value: true });
var joi = require('joi');
// Generate a validation schema using joi to check the type of your environment variables
var envSchema = joi
  .object({
    MONGO_URL: joi.string(),
  })
  .unknown()
  .required();
// Validate the env variables using joi.validate()
var _a = envSchema.validate(process.env),
  error = _a.error,
  envVars = _a.value;
if (error) {
  throw new Error('Config validation error: ' + error.message);
}
var config = {
  databaseConfig: {
    database_url: envVars.MONGO_URL,
  },
};
exports.default = config;
