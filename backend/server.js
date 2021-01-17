const http = require('http');
const app = require('./app');
const port = process.env.PORT || 2019;
//import config from './config.js'
const config =  require('./config')
const server = http.createServer(app);


app.listen(config.PORT, () => {
    console.log('Server started at  http://localhost:'+config.PORT);
  });