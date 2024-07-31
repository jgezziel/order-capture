import express, { type Application, json } from "express";
import config from "./config";
import morgan from "morgan";
import corsMiddleware from "./middlewares/cors";

//Routes
import customerRoutes from "./routes/customer.routes";
import shippingAddressRoutes from "./routes/shippingAddress.routes";

const app: Application = express();
app.set("port", config.port);
app.set("apiURL", config.port + config.apiVersion);

app.disable("x-powered-by");

//Morgan only in development
app.use(morgan("dev"));

//Middlewares
app.use(json());
app.use(corsMiddleware({ acceptedOrigins: config.cors.acceptedOrigins })); // CORS

//Api version
const apiVersion = config.apiVersion;

//Routes
app.get(`${apiVersion}/`, (_req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use(`${apiVersion}/customers`, customerRoutes);
app.use(`${apiVersion}/shipping-addresses`, shippingAddressRoutes);

export default app;
