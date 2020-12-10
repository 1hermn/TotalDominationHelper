const request = require('request');
const config = require("./config.json")
const low = require('lowdb')
const child_process = require('child_process');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db/db.json')
const db = low(adapter)
const tools = require('./tools/tools.js')


const UpdateDb = new Promise((resolve, reject) => {
  db.read()
  resolve('Буфер данных обновлен')
});

let cycle = setInterval(async () => {
	tools.log("[HANDLER]", "Начало обработки хранилища запросов")
	for(i = db.read().get('last_num').value(); i >= 0; i--){
		let res = await UpdateDb;
		let value = db.get('todos').find({num: i}).value()
		if(value != undefined && value.send == 0){
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
request(options, async function (error, response, body) {
  
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