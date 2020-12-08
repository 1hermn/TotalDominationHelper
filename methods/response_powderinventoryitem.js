exports.run = (method, sign, path, fs, tools, id, request, config) => {
	var file = fs.readFileSync(path, 'utf8')
	var new_file = file.substr(0, file.indexOf('!'))
	fs.writeFileSync(path, new_file, 'utf8')
	var response_JSON = require("D:/TotalDominationHelper/"+path)//в будущем упростить
	var options = {
  uri: config.url+"/powder",
  method: 'POST',
  json: {
    "type": method,
    "time_end": response_JSON.o.t,
    "id_p": id,
    "sign": sign
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response)
  }
});
	tools.log("Разбор предмета на осколки завершится в:", tools.convertTimestamp(response_JSON.o.t))
	fs.removeSync(path, { recursive: true });
};