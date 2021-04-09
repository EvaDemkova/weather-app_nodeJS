console.log("Client side JS file is loaded");

// const url = `http://api.weatherstack.com/current?access_key=9dc1ec9eb9e98fa8944c2382e353122b&query=Prague`;

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   //   console.log(response);
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

//DOM definition
const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const place = document.querySelector("#place");
const prec = document.querySelector("#prec");
const temp = document.querySelector("#temp");
const weather = document.querySelector("#weather");
const localtime = document.querySelector("#localtime");
const wind_speed = document.querySelector("#wind_speed");
const wind_dir = document.querySelector("#wind_dir");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");
const feelslike = document.querySelector("#feelslike");
const uv_index = document.querySelector("#uv_index");
const is_day = document.querySelector("#is_day");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  //after heroku applocation http://localhost:3000/weather?address=${location} will be change only to /weather?adress....
  const url = `/weather?address=${location}`;

  place.textContent = "Loading ...";
  prec.textContent = "";
  temp.textContent = "";
  weather.textContent = "";

  fetch(url).then((response) => {
    console.log(response);
    response.json().then((data) => {
      if (data.error) {
        place.textContent = data.error;
        console.error(data.error);
      } else {
        place.textContent = data.location;
        prec.textContent = `${data.forecast.precipitation} mm`;
        temp.textContent = `${data.forecast.temperature} °C`;
        weather.textContent = `${data.forecast.weather}`;
        localtime.textContent = `${data.forecast.localtime}`;
        wind_speed.textContent = `${data.forecast.wind_speed} km/h`;
        wind_dir.textContent = `Wind direction is: ${data.forecast.wind_dir}`;
        pressure.textContent = `${data.forecast.pressure} millibar`;
        humidity.textContent = `${data.forecast.humidity} %`;
        feelslike.textContent = `${data.forecast.feelslike} °C`;
        uv_index.textContent = `UV index: ${data.forecast.uv_index}`;
        is_day.textContent = `${data.forecast.is_day}`;
        // console.log(data.location);
        // console.log(data.forecast);
      }
    });
  });
});

// console.log(input.textContent);
// input.addEventListener("keyup", (e) => {
//   console.log(e.target.value);
// });
