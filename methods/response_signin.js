exports.run = (method, sign, path, fs, tools, id, request, config) => {
	console.log(id)
	fs.removeSync(path, { recursive: true });
};