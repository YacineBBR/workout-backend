require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
// the app
const app = express();
// midleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// routes
app.use("/api/workouts", workoutRoutes);
// data base
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listning on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
