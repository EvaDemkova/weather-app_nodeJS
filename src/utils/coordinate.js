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
        localtime: body.location.localtime,
        wind_speed: body.current.wind_speed,
        wind_dir: body.current.wind_dir,
        pressure: body.current.pressure,
        humidity: body.current.humidity,
        feelslike: body.current.feelslike,
        uv_index: body.current.uv_index,
        is_day: body.current.is_day,
      });
    }
  });
};

module.exports = { forecast };
