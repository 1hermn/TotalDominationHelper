exports.run = (method, sign, path, fs, tools, id, db) => {
	console.log(id)
	fs.removeSync(path, { recursive: true });
};