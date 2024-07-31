export default {
  port: process.env.PORT || 3000,
  apiVersion: process.env.API_VERSION || "/api/v1",
  cors: {
    acceptedOrigins: ["http://localhost:4000"],
    allowedOrigins: ["http://localhost:3000"],
  },
};
