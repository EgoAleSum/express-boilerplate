module.exports = function(app){
	app.get('/', function(req, res, next){
		res.send(200, 'Hello world!')
	})
}
