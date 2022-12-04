const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();

//MongoConnect
const { mongoConnect } = require("./Database/mongoDb");

app.use(cors());

//Model
const Profile = require("./models/profile");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/profile", (req, res) => {
  Profile.fetchAll()
    .then((profile) => {
      let data = profile.length > 0 ? profile[0] : {};
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.post("/profile", (req, res) => {
  const { first_name, last_name, display_name, phone, location, email, _id } =
    req.body;

  const profile = new Profile(
    first_name,
    last_name,
    display_name,
    phone,
    _id,
    location,
    email
  );
  profile
    .save()
    .then((profile) => {
      console.log("profile", profile);
      let data = profile.length > 0 ? profile[0] : {};
      res.json(data);
    })
    .catch((err) => console.log(err));
});

mongoConnect(() => {
  app.listen(process.env.port || 8080, () => {
    console.log("server started listening to port");
  });
});
