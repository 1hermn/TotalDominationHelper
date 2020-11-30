exports.run = (method, sign, path, fs, tools, id, db) => {
  var request = require("D:/TotalDominationHelper/"+path)//в будущем упростить
  //тут действия
  //значит выводить постройку либо кодом, либо по базе (json/lowdb, база должна быть на сервере), построек использовать название постройки
  
  //также необходимо записывать i(судя по всему - это индекс постройки).
  //поможет, если вдруг будет применение бустов
  db.get(`${id}.actions`)
  .push({ type: `buy_${request.t}`, id: request.o.o.t, time_start: request.t, sign: sign, time_end: 0})
  .write()
  tools.log(`Здание/Юниты (уровень ${request.o.o.c.l}) начинают строится в:`, tools.convertTimestamp(request.t))
	fs.removeSync(path, { recursive: true });
};