exports.run = (method, sign, path, fs, tools, id, db, config) => {
	var file = fs.readFileSync(path, 'utf8')
	var new_file = file.substr(0, file.indexOf('!'))
	fs.writeFileSync(path, new_file, 'utf8')
	
	var response_JSON = require("D:/TotalDominationHelper/"+path)//в будущем упростить
	/*var options = {
  uri: config.url+"/buy",
  method: 'POST',
  json: {
    "type":method,
    "time_end": response_JSON.o.f,
    "id_p": id,
    "sign": sign
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
      .push({num: num, type: method, id: 0, time_start: 0, sign: sign, id_p: id, time_end: response_JSON.o.f, send: 0, send: 0}).write()
      db.update('last_num', n => n + 1).write()
  }else {
    db.get('todos')
      .find({sign: sign})
      .assign({time_end: response_JSON.o.f}).write()
  }
	  tools.log("Постройка здания/юнита(ов) будет закончена в:", tools.convertTimestamp(response_JSON.o.f))
	fs.removeSync(path, { recursive: true });
};