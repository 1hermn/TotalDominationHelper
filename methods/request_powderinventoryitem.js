exports.run = (method, sign, path, fs, tools, id, request, config) => {
	var request_JSON = require("D:/TotalDominationHelper/"+path)
	var options = {
  uri: config.url+"/powder",
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
  tools.log("Разбор предмета на осколки начат в:", tools.convertTimestamp(request_JSON.t))
	fs.removeSync(path, { recursive: true });
};