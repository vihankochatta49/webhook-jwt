// Store the credential variables in .env file and retrieve the values from here.

const dotenv = require('dotenv');
dotenv.config();
 module.exports= {
  ZOOM_API_KEY: process.env.APIKey,
  ZOOM_API_SECRET: process.env.APISecret,
  VERIFICATION_TOKEN: process.env.VerificationToken
};
