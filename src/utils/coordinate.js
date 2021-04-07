const request = require("request");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const forecast = (latitude, longitude, callback) => {
  const key = process.env.ACCESS_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(body.info, undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        precipitation: body.current.precip,
        weather: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = { forecast };
