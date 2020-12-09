const request = require('request');
const config = require("./config.json")
const low = require('lowdb')
const child_process = require('child_process');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db/db.json')
const db = low(adapter)

let cycle = setInterval(() => {
	console.log('tick')
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

request(options, function (error, response, body) {
  
  if (!error && response.statusCode == 200) {
    console.log(response.body)
    db.get('todos').remove({num: i}).write()
  }else {
    console.log(error)
  }
})
}