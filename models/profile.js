const { getDB } = require("../Database/mongoDb");
const mongoDB = require("mongodb");

class Profile {
  constructor(
    first_name,
    last_name,
    display_name,
    phone,
    _id,
    location,
    email
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.display_name = display_name;
    this.phone = phone;
    this._id = _id ? mongoDB.ObjectId(_id) : null;
    this.location = location;
    this.email = email;
  }

  save() {
    if (this._id) {
      return getDB()
        .collection("profile")
        .updateOne({ _id: mongoDB.ObjectId(this._id) }, { $set: this })
        .then((res) => Profile.fetchAll())
        .catch((err) => console.log(err));
    } else {
      return getDB()
        .collection("profile")
        .insertOne(this)
        .then((res) => Profile.fetchAll())
        .catch((err) => console.log(err));
    }
  }

  static fetchAll() {
    console.log("inside fetchall");
    return getDB()
      .collection("profile")
      .find()
      .toArray()
      .then((profile) => profile)
      .catch((err) => console.log(err));
  }
}

module.exports = Profile;
