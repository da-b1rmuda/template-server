import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

//#region routes

//#endregion

//#region Cors
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // HOST
  // res.setHeader('Access-Control-Allow-Origin', 'https://jlk0wqq0-3000.euw.devtunnels.ms');
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    next();
  }
});
//#endregion

app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
