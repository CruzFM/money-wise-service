const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Money Wise",
      version: "1.0.0",
      description: "Money Wise API provides endpoints to manage user transactions, including creating, retrieving, updating, and deleting transactions. The API also supports user authentication via JWT tokens to ensure secure access.",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = ( app ) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}