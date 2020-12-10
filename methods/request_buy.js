exports.run = (method, sign, path, fs, tools, id, db, config) => {
  var request_JSON = require("D:/TotalDominationHelper/"+path)//в будущем упростить
  //также необходимо записывать i(судя по всему - это индекс постройки).
  //поможет, если вдруг будет применение бустов
 /* var options = {
  uri: config.url+"/buy",
  method: 'POST',
  json: {
    "type": method,
    "id": request_JSON.o.o.t,
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
    try{
    db.get('todos')
      .push({num: num, type: method, id: request_JSON.o.o.t, time_start: request_JSON.t, sign: sign, id_p: id, time_end: 0, send: 0}).write()
      db.update('last_num', n => n + 1).write()
    }catch (err){
      console.log(err)
    }
  }else {
    db.get('todos')
      .find({sign: sign})
      .assign({type: method, id: request_JSON.o.o.t, time_start: request_JSON.t, id_p: id}).write()
      db.update('last_num', n => n + 1).write()
  }
  tools.log(`Здание/Юниты (уровень ${request_JSON.o.o.c.l}) начинают строится в:`, tools.convertTimestamp(request_JSON.t))
	fs.removeSync(path, { recursive: true });
};
