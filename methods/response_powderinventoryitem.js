exports.run = (method, sign, path, fs, tools, id, db) => {
	var file = fs.readFileSync(path, 'utf8')
	var new_file = file.substr(0, file.indexOf('!'))
	fs.writeFileSync(path, new_file, 'utf8')
	var response = require("D:/TotalDominationHelper/"+path)//в будущем упростить
	db.get(`${id}.actions`)
	  .find({ sign: sign })
	  .assign({time_end: response.o.t})
	  .write()
	tools.log("Разбор предмета на осколки завершится в:", tools.convertTimestamp(response.o.t))
	fs.removeSync(path, { recursive: true });
};