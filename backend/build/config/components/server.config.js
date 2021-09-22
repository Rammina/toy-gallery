Object.defineProperty(exports, '__esModule', { value: true });
// data validation tool
var joi = require('joi');
// Generate a validation schema using joi to check the type of your environment variables
var envSchema = joi
  .object({
    NODE_ENV: joi.string().valid('development', 'production', 'test'),
    PORT: joi.number(),
    API_VERSION: joi.string(),
  })
  .unknown()
  .required();
var _a = envSchema.validate(process.env),
  error = _a.error,
  envVars = _a.value;
if (error) throw new Error('Config validation error: ' + error.message);
var config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT || 5000,
    apiVersion: envVars.API_VERSION || 'v1',
  },
};
exports.default = config;
