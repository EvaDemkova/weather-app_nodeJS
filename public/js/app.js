console.log("Client side JS file is loaded");

// const url = `http://api.weatherstack.com/current?access_key=9dc1ec9eb9e98fa8944c2382e353122b&query=Prague`;

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  //   console.log(response);
  response.json().then((data) => {
    console.log(data);
  });
});

//DOM definition
const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const place = document.querySelector("#place");
const prec = document.querySelector("#prec");
const temp = document.querySelector("#temp");
const weather = document.querySelector("#weather");

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
