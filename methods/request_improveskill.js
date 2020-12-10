exports.run = (method, sign, path, fs, tools, id, db, config) => {
  var request_JSON = require("D:/TotalDominationHelper/"+path)//в будущем упростить
  //тут действия
  //значит выводить постройку либо кодом, либо по базе (json/lowdb, база должна быть на сервере), построек использовать название постройки
  tools.log("Начало улучшения в :", tools.convertTimestamp(request_JSON.t))
  tools.log("Ячейка:", request_JSON.o.i)
  /*var options = {
  uri: config.url+"/imp",
  method: 'POST',
  json: {
    "type": method,
    "id": request_JSON.o.i,
    "time_start": request_JSON.t,
    "sign": sign,
    "i": 0,
    "id_p": id
  }
};

request(options, function (error, response, body) {
  
  if (!error && response.statusCode == 200) {
    console.log(response.body)
  }else {
    console.log(error)
  }
});*/
db.read()
  if(!db.get('todos').find({sign: sign}).value()){
    var num = db.get('last_num').value()
    db.get('todos')
      .push({num: num, type: method, id: request_JSON.o.i, time_start: request_JSON.t, sign: sign, id_p: id, time_end: 0, send: 0}).write()
      db.update('last_num', n => n + 1).write()
  }else {
    db.get('todos')
      .find({sign: sign})
      .assign({type: method, id: request_JSON.o.i, time_start: request_JSON.t, id_p: id}).write()
      db.update('last_num', n => n + 1).write()
  }
  tools.log(`Улучшение юнита ${request_JSON.o.i} начато в:`, tools.convertTimestamp(request_JSON.t))
	fs.removeSync(path, { recursive: true });
};