exports.run = (method, sign, path, fs, tools, id, request, config) => {
	var file = fs.readFileSync(path, 'utf8')
	var new_file = file.substr(0, file.indexOf('!'))
	fs.writeFileSync(path, new_file, 'utf8')
	var response = require("D:/TotalDominationHelper/"+path)//в будущем упростить
	db.get(`${id}.actions`)
	  .find({ sign: sign })
	  .assign({time_end: response.o.f})
	  .write()
	  tools.log("Постройка здания/юнита(ов) будет закончена в:", tools.convertTimestamp(response.o.f))
	fs.removeSync(path, { recursive: true });
};