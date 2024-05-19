require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to database with server listener inside
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("--MongoDB Connected--");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to the commotion on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB error:\n", error);
  });
