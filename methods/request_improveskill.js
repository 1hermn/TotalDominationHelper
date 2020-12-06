exports.run = (method, sign, path, fs, tools, id, request, config) => {
  var request_JSON = require("D:/TotalDominationHelper/"+path)//в будущем упростить
  //тут действия
  //значит выводить постройку либо кодом, либо по базе (json/lowdb, база должна быть на сервере), построек использовать название постройки
  tools.log("Начало улучшения в :", tools.convertTimestamp(request_JSON.t))
  tools.log("Ячейка:", request_JSON.o.i)
  var options = {
  uri: config.url,
  method: 'POST',
  json: {
    "type": "improveskill",
    "id": request_JSON.o.i,
    "time_start": request_JSON.t,
    "sign": sign,
    "i": 0,
    "id_p": id
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id)
  }
});
  //дописать добавление в бд
  tools.log(`Улучшение юнита ${request_JSON.o.i} начато в:`, tools.convertTimestamp(request_JSON.t))
	fs.removeSync(path, { recursive: true });
};