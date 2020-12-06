exports.run = (method, sign, path, fs, tools, id, request, config) => {
	var request = require("D:/TotalDominationHelper/"+path)
	 db.get(`${id}.actions`)
  .push({ type: `upgradeinventoryitem_${request.t}`, id: request.o.i, time_start: request.t, sign: sign, time_end: 0})
  .write()
  tools.log("Улучшение предмета начато в:", tools.convertTimestamp(request.t))
	fs.removeSync(path, { recursive: true });
};