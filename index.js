const fs = require('fs-extra');
const chokidar = require('chokidar');
const Enmap = require("enmap");
const tools = require('./tools/tools.js')
const request = require('request')
const config = require("./config.json")

tools.log("[START]","Бот запущен успешно")

function IfFileCreate(filename){
		fs.readFile('./requests/' + filename, "utf8", (error, data) => {
			if(error) throw error
			let index = data.indexOf('}');
		//вот тут действия над файлом
		let log = "FILE" + filename + "; { in " + index;
			return log
	})
}

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
			method_cmd.run(file.split(".")[1], sign, path, fs, tools, id, request, config);//TODO:
			/*
			В файле метода request_buy есть заготовка для того, чтобы удалить символы после ! и сам этот символ
			*/
  		}
  		if(file.split("_")[0] == "response"){
  			if (!method_cmd) return;
			method_cmd.run(file.split(".")[1], sign, path, fs, tools, id, request, config);
  		}
  	}catch(err){
  		
  	}
	}
});
