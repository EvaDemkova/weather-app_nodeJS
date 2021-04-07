const request = require("request");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const geoCode = (address, callback) => {
  if (!address) {
    return console.log("You did not provide location");
  }

  const token = process.env.TOKEN;
  const encodedAddress = encodeURIComponent(address);
  const geo_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${token}&limit=1`;
  request({ url: geo_url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Place does not exists", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = { geoCode };
