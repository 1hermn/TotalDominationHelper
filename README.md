# Помощник Правила Войны
Использует Fiddler для получения запросов и node js для работы с ними
#### Возможности
- Отправляет в вк уведомления о:
	- Начале или завершении постройки
		- Зданий
		- Войск
	- Начале или завершении изучения
		- Технологий
		- Технологий в ЦУ
	- Начале и завершении разбора/улучшения предметов наёмника
	 
# Использовать мой сервер с базой данных
- Скачайте последнюю версию, использую в Releases
- Скачайте и установите [Fiddler](https://www.telerik.com/download/fiddler)
	- После установки откройте Fiddler и перейдите в FiddlerScripts
	- Найдите строку, которая начинается с```
	static function OnBeforeResponse(oSession: Session)```
	- Замените эту функцию на
	```javascript
    static function OnBeforeResponse(oSession: Session) {
        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }
        if ((oSession.responseCode == 200) && oSession.oRequest.headers.ExistsAndContains("Host", "pvppru2s00.plrm.zone") && oSession.oRequest.headers["server-method"] != undefined) { 
            oSession.SaveResponseBody("D:\\TotalDominationHelper\\requests\\"+ oSession.oRequest.headers["server-method"] + "\\" + "response_" + oSession.oRequest.headers["sign-code"] + "." + oSession.oRequest.headers["server-method"] + "." + oSession.oRequest.headers["signin-userId"] + ".json");
            oSession.SaveRequestBody("D:\\TotalDominationHelper\\requests\\"+ oSession.oRequest.headers["server-method"] + "\\"+ "request_" + oSession.oRequest.headers["sign-code"] + "." + oSession.oRequest.headers["server-method"] + "." + oSession.oRequest.headers["signin-userId"] + ".json");
        }
    }
    ```
     - Где ```"D:\\TotalDominationHelper\\requests\\"``` путь до папки ```requests``` в проекте
     - ```Tools->Options->HTTPS``` поставте галочку напротив HTTPS и Decrypt
 - Скачайте и установите [node.js](https://nodejs.org/en/)
 - Создайте в корне проекта файл config.json с содержимым
 ```javascript 
 {
	"url" : "totaldomhelper.dokaplus.by"
}
```
- Запустите ```start.bat```, запустите игру (клиент, либо в браузере)
	- В окне будет написан ваш ```id```, скопируйте, понадобиться
	- После сделайте любое действие, например поставте одно пехотинца в очередь. Зайдите в сообщения [бота вк](https://vk.com/totaldomhelp), нажмите начать, введите /myid id, где id - это то, что вы скопировали. Пример : ```/myid pp123123123```
	- Успешно привязан вк к базе данных, теперь все уведомления будут приходить туда.
- Если хотите предложить новую фичу - пишите, всё рассмотрю
# TODO
[TODO](./requests/todo.md)
# SERVER
[SERVER](https://github.com/1hermn/TotalDomHelperServer)