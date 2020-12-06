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
	if(!db.has(`${req.body.id_p}.actions`).value()){
		db.set(`${req.body.id_p}`, {"vk_id" : 0, "actions": []})
		.write()
	}if(req.body.time_end === undefined){
	db.get(`${req.body.id_p}.actions`)
	  .push({ type: `buy_${req.body.time_start}`, id: req.body.id, time_start: req.body.time_start, sign: req.body.sign, time_end: 0})
	  .write()
	}
	if(req.body.time_end != undefined){
	db.get(`${req.body.id_p}.actions`)
	  .find({ sign: req.body.sign })
	  .assign({time_end: req.body.time_end})
	  .write()
	}
	res.send({"message" : "Новое событие записано в базу данных"});
});
server.post('/imp', function(req, res){
	if(!db.has(`${req.body.id_p}.actions`).value()){
		db.set(`${req.body.id_p}`, {"vk_id" : 0, "actions": []})
		  .write()
	}

		if(req.body.time_end === undefined){
			db.get(`${req.body.id_p}.actions`)
  			  .push({ type: `improveskill_${req.body.time_start}`, id: req.body.id, time_start: req.body.time_start, sign: req.body.sign, time_end: 0})
  			  .write()
		}if(req.body.time_end != undefined){
			db.get(`${req.body.id_p}.actions`)
			  .find({ sign: req.body.sign })
			  .assign({time_end: req.body.time_end})
			  .write()

}
	res.send({"message" : "Новое событие записано в базу данных"});
});
server.post('/powder', function(req, res){
	if(!db.has(`${req.body.id_p}.actions`).value()){
		db.set(`${req.body.id_p}`, {"vk_id" : 0, "actions": []})
		.write()
	}
		if(req.body.time_end === undefined){
			db.get(`${req.body.id_p}.actions`)
  			  .push({ type: `powderinventoryitem_${req.body.time_start}`, id: req.body.id, time_start: req.body.time_start, sign: req.body.sign, time_end: 0})
  			  .write()
		}if(req.body.time_end != undefined){
			db.get(`${req.body.id_p}.actions`)
			  .find({ sign: req.body.sign })
			  .assign({time_end: req.body.time_end})
			  .write()	

}
	res.send({"message" : "Новое событие записано в базу данных"});
});
server.post('/upgr', function(req, res){
	if(!db.has(`${req.body.id_p}.actions`).value()){
		db.set(`${req.body.id_p}`, {"vk_id" : 0, "actions": []})
		.write()
	}
		if(req.body.time_end === undefined){
			db.get(`${req.body.id_p}.actions`)
              .push({ type: `upgradeinventoryitem_${req.body.time_start}`, id: req.body.id, time_start: req.body.time_start, sign: req.body.sign, time_end: 0})
              .write()
		}if(req.body.time_end != undefined){
			db.get(`${req.body.id_p}.actions`)
			  .find({ sign: req.body.sign })
			  .assign({time_end: req.body.time_end})
			  .write()	

}
	res.send({"message" : "Новое событие записано в базу данных"});
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});