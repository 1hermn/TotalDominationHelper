exports.run = (method, sign, path, fs, tools, id, request, config) => {
	var request_JSON = require("D:/TotalDominationHelper/"+path)
	var options = {
  uri: config.url+"/upgr",
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
});
  tools.log("Улучшение предмета начато в:", tools.convertTimestamp(request_JSON.t))
	fs.removeSync(path, { recursive: true });
};