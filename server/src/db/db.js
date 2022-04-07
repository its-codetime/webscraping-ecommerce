const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose.connect(
    "mongodb+srv://admin:yFZRWyJNEqWH1R04@cluster0.ib5fv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  mongoose.connection.once("open", () => {
    console.log("connected to mongoose");
  });
};

module.exports = dbConnect;
