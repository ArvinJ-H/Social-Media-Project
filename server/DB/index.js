const mongoose = require("mongoose");


mongoose
  .connect(
    "mongodb+srv://arvin:plmJ06dmhMWMxfcl@3120.ovb4d.mongodb.net/3120?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },

    console.log("Connected...")
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;
db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


module.exports = db;