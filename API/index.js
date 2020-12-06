var restify = require('restify');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db/db.json')
const low = require('lowdb')
const db = low(adapter)

var server = restify.createServer({
  name: 'Hello World!',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.post('/buy', function(req, res){
	/*db.get(`${id}.actions`)
	.push({ type: `buy_${request.t}`, id: request.o.o.t, time_start: request.t, sign: sign, time_end: 0})
	.write()
	Это запрос от запроса. 
	Далее от ответа. В коде это будет выгляжеть так: есть есть параметр time_end. То же самое применимо и
	к остальным функциям
	db.get(`${id}.actions`)
	  .find({ sign: sign })
	  .assign({time_end: response.o.f})
	  .write()
	*/
	res.send({"message" : "Новое событие записано в базу данных"});
});
server.post('/imp', function(req, res){
	 /*db.get(`${id}.actions`)
  .push({ type: `improveskill_${request.t}`, id: request.o.i, time_start: request.t, sign: sign, time_end: 0})
  .write()*/
	res.send({"message" : "Новое событие записано в базу данных"});
});
server.post('/powder', function(req, res){
	/*db.get(`${id}.actions`)
  .push({ type: `powderinventoryitem_${request.t}`, id: request.o.i, time_start: request.t, sign: sign, time_end: 0})
  .write()*/
	res.send({"message" : "Новое событие записано в базу данных"});
});
server.post('/upgr', function(req, res){
	/*db.get(`${id}.actions`)
  .push({ type: `upgradeinventoryitem_${request.t}`, id: request.o.i, time_start: request.t, sign: sign, time_end: 0})
  .write()
  */
	res.send({"message" : "Новое событие записано в базу данных"});
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});