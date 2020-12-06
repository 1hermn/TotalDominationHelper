exports.run = (method, sign, path, fs, tools, id, request, config) => {
  var request = require("D:/TotalDominationHelper/"+path)//в будущем упростить
  //тут действия
  //значит выводить постройку либо кодом, либо по базе (json/lowdb, база должна быть на сервере), построек использовать название постройки
  console.log("Начало улучшения в :", tools.convertTimestamp(request.t))
  console.log("Ячейка:", request.o.i)
  //дописать добавление в бд
   db.get(`${id}.actions`)
  .push({ type: `improveskill_${request.t}`, id: request.o.i, time_start: request.t, sign: sign, time_end: 0})
  .write()
  tools.log(`Улучшение юнита ${request.o.i} начато в:`, tools.convertTimestamp(request.t))
	fs.removeSync(path, { recursive: true });
};