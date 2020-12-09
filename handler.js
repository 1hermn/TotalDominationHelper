const request = require('request');
const config = require("./config.json")
const low = require('lowdb')
const child_process = require('child_process');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db/db.json')
const db = low(adapter)
const tools = require('./tools/tools.js')

let cycle = setInterval(() => {
	tools.log("[HANDLER]", "Обработка буферного хранилища запросов")
	for(i = db.get('last_num').value(); i >= 0; i--){
		db.read()
		let value = db.get('todos').find({num: i}).value()
		if(value != undefined){
			send(value, i)
		}
	}
}, 1000*10);

function send(JSON, i){
	var options = {
  uri: config.url+"/buy",
  method: 'POST',
  json: {
  	"type": JSON.type,
    "time_end": JSON.time_end,
    "id_p": JSON.id_p,
    "sign": JSON.sign,
    "time_start": JSON.time_end,
    "id": JSON.id
  }
};
try {
request(options, function (error, response, body) {
  
  if (!error && response.statusCode == 200) {
    tools.log("[SEND\\HANDLER]", response.body.message)
    db.get('todos').remove({num: i}).write()
	tools.log("[REMOVE\\HANDLER]", "Отправленное событие удалено")
  }else {
    console.log(error)
  }
})
}catch (err){
	console.log(err)
}
} 