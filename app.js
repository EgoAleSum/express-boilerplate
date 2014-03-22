var express = require('express')
var http = require('http')

var app = express()

// Load environments
var environment = require(__dirname + '/lib/environment')(app)

app.enable('trust proxy') // Enable support for reverse proxies
app.disable('x-powered-by') // Remove the powered-by header

app.use(require('morgan')('dev')) // Logging
app.use(require('errorhandler')())
app.use(require('multer')())
app.use(require('compression')())
app.use(require('cookie-parser')())

// Allow CORS
// require('./middleware/crossDomain')(app)

// Force SSL/TLS
// app.use(require('./middleware/forceTLS'))

app.use(function(req, res, next) {
	res.set('X-Frame-Options', 'SAMEORIGIN') // These pages can't be shown in frames
	next()
})

// Routing
require('./routes')(app)

// No response so far... then send a 404!
app.all('*', function(req, res, next) {
	res.send(404, 'The requested resource does not exist')
})

http.createServer(app).listen(app.get('config-http-port'))
