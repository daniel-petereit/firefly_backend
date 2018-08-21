const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routers/api');
const picsRoutes = require('./routers/pics');
const usersRoutes = require('./routers/users');
const http = require('http');

require('dotenv').config();
// Options
app.disable('x-powered-by');
app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Routes
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', routes);
app.use('/pics', picsRoutes);
app.use('/users', usersRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})



// 500s Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

// 404s Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

// Listen
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})


module.exports = app
