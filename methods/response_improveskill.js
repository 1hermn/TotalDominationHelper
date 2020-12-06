exports.run = (method, sign, path, fs, tools, id, request, config) => {
	var file = fs.readFileSync(path, 'utf8')
	var new_file = file.substr(0, file.indexOf('!'))
	fs.writeFileSync(path, new_file, 'utf8')
	var response_JSON = require("D:/TotalDominationHelper/"+path)//в будущем упростить
	var options = {
  uri: config.url+"/imp",
  method: 'POST',
  json: {
    "time_end": response_JSON.o.s.c.f,
    "id_p": id,
    "sign": sign
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id)
  }
});
	tools.log("Улучшение юнита завершится в:", tools.convertTimestamp(response_JSON.o.s.c.f))
	fs.removeSync(path, { recursive: true });
};