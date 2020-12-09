const fs = require('fs-extra');
const chokidar = require('chokidar');
const Enmap = require("enmap");
const tools = require('./tools/tools.js')
const config = require("./config.json")
const low = require('lowdb')
const child_process = require('child_process');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/db.json')
const db = low(adapter)

db.defaults({ 
	todos: [],
	last_num: 0 
}).write()


tools.log("[START\\MAIN]","Бот запущен успешно")
tools.log("[START\\HANDLER]", "Обработчик запущен")

const start = child_process.fork("./handler.js")

methods = new Enmap();

fs.readdir("./methods/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./methods/${file}`);
    let methoddName = file.split(".")[0];
    methods.set(methoddName, props);
  });
});

chokidar.watch('./requests/').on('all', (event, path) => {
	if(event == "add" || event == "change"){
  		//разбить path на массивы через сплит.
  		try{let file_arr = path.split("\\")//если Windows. Если Linux заменить на / или //
  		let file = file_arr[2] // получение файла
  		let sign = file.split("_")[1].split(".")[0] // получение кода, который идёт в exprots.run или module.exports
  		const method = file.split("_")[0].toLowerCase() + "_" + file.split(".")[1].toLowerCase();
  		const method_cmd = methods.get(method);
  		var id = file.split(".")[2]
  		if(file.split("_")[0] == "request"){
  			//Вывод запроса/ответа, метода, кода.
  			if (!method_cmd) return;
        // переписать, убрать db, когда будет всё закончено. 
        // добавить request
			method_cmd.run(file.split(".")[1], sign, path, fs, tools, id, db, config);//TODO:
  		}
  		if(file.split("_")[0] == "response"){
  			if (!method_cmd) return;
			method_cmd.run(file.split(".")[1], sign, path, fs, tools, id, db, config);
  		}
  	}catch(err){
  		
  	}
	}
});
