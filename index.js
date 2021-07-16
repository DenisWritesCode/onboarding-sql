const express = require("express");
const cors = require('cors');

// Import routes
const institutionRoutes = require("./routes/institutionRoutes");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Express App
const app = express();

app.listen("3000", () => {
  console.log("Listening on Port 3000...");
});
// middleware & static files
app.use(express.static("public"));
// Needed for accessing data from the URL
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.set('view engine', 'ejs');
app.use(cors({
  origin: '*'
}));

// Routes
app.get('/', (req, res) => {
    res.redirect('/institutions');
});

app.use("/institutions", institutionRoutes);
app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).send("Error! Page not found :(");
});
