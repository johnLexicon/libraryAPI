// Should be invoked as soon as possible
require('dotenv').config();

const app = require("./app");
const mongoose = require("mongoose");

app.set("port", process.env.PORT || 9999);


app.listen(app.get("port"), () => {
  console.log("Server running on: http://localhost:" + app.get("port"));
});

const mongoURI =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dn3uh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("useCreateIndex", true).connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to Database")
);
