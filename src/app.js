const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
// set this if run nodemon from src folder
// dotenv.config({ path: "../.env" });

// use line bellow if running nodemon from root directory
dotenv.config();
const hbs = require("hbs");

//importing modules geoCode, forecast
const { geoCode } = require("./utils/geo");
const { forecast } = require("./utils/coordinate");

const app = express();

// handlebars => templating engine form JS

//47. hbs => handlebars for express
//.set('key', 'value') ...i guess
app.set("view engine", "hbs");
// defining where to look for all views (default is src/views)
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

// paths will work as follows /, /about.html, /help.html
// defining path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
// setup static directory to serve
app.use(express.static(publicDirectoryPath));

//defining path to partials footer,header...
const partialsPath = path.join(__dirname, "../templates/partials");
//hbs config with partialsPath
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  // allow us to render one of our views
  res.render("index", {
    title: "Central Radar",
    name: "Eva",
  });
});

app.get("/about", (req, res) => {
  // allow us to render one of our views
  res.render("about", {
    title: "About me",
    name: "Eva",
  });
});

app.get("/help", (req, res) => {
  // allow us to render one of our views
  res.render("help", {
    message: "Helping message comming ...",
    title: "Help",
    name: "Eva",
  });
});

//50. 404 errors
app.get("/help/*", (req, res) => {
  res.render("404page", {
    errorMessage: "Help article not found",
    name: "Eva",
    title: "404",
  });
});

//54. query string
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  res.send({
    products: [],
  });
});

// app.com / waeather;
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is required",
    });
  } else {
    geoCode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          return res.send({
            location,
            forecast: forecastData,
            adress: req.query.address,
          });
        });
      }
    );
  }
});

//setting 404 pages. Important that this app.get comes last !!
app.get("/*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Page not found",
    name: "Eva",
  });
});

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

// domain app.com
// first argument path, second is callback that tells what to to next when user visit the path
// app.get("", (req, res) => {
//   //sending html
//   res.send("<h1>weather</h1>");
// });

//app.com/help
// app.get("/help", (req, res) => {
//   //sending JSON-> object is autmatically transformed to JSON !!!
//   res.send([
//     {
//       name: "Eva",
//       age: 26,
//     },
//     {
//       name: "Sam",
//       age: 55,
//     },
//   ]);
// });

//app.com/about
// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

//adding heroku port
const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
