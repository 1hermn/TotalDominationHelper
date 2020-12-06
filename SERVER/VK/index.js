const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');
const config = require('./config.json')

const vk = new VK({
	token: process.env.TOKEN || config.token
});

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear('/start', async (context) => {
	await context.send(`
		Вы разрешили отправлять сообщения
		Введите команду /id, где id, ваш ид, чтобы добавить id аккаунта ПВ
	`);
});

vk.updates.on('message_new', async (context, next) => {
	var id = context.text.split("/")[1];
	context.send(`Ваш id : ${id}`)
	//добавление в бд
	//путь до бд должен быть создан в env перед запуском бота вк
})

vk.updates.start().catch(console.error);