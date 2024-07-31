import express, { type Application, json } from "express";
import config from "./config";
import morgan from "morgan";

const app: Application = express();
app.set("port", config.port);
app.set("apiURL", config.port + config.apiVersion);

app.disable("x-powered-by");

//Morgan only in development
app.use(morgan("dev"));

//Middlewares
app.use(json());

//Api version
const apiVersion = config.apiVersion;

//Routes
app.get(`${apiVersion}/`, (_req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

export default app;
