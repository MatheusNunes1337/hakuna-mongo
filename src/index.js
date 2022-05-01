const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const http = require('http') 
const { Server } = require('socket.io')
require('express-async-errors')
// const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorMiddleware');
require('./infra/database');
const swaggerDocs = require('./swagger.json');

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.json());
    this.express.use(cors());
    this.express.options('*', cors());
    this.express.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  }

  routes() {
    this.express.use(routes);
  }

  errors() {
    this.express.use(errorHandler);
  }
}

const app = new App().express

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
})

module.exports = server
