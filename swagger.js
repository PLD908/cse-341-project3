const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users API',
        description: 'Users API with Authentication.',
    },
    host: 'cse-341-project3-bqsu.onrender.com/api',
    schemes: ['https'],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "https",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [{ BearerAuth: [] }] // Apply authentication globally
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
