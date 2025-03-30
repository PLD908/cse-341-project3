const express = require('express');
const router = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation with JWT authentication",
    },
    servers: [
      {
        url: "/", // Change this to your server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "https",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Change this to the correct path of your route files
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
