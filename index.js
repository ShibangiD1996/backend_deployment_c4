const express = require("express");
const { connection } = require("./db");
const { authenticate } = require("./middleware/Authentication.middleware");
const cors = require("cors");
const app = express();
const { userRouter } = require("./routes/User.routes");
const { postRouter } = require("./routes/Posts.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);
app.use(cors());
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't connect");
    console.log(err);
  }
  console.log(`Running the server at port ${process.env.port}`);
});
