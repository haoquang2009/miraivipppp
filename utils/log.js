const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ ❕ Lỗi rồi ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ ❕ Lỗi rồi ] » ') + data);
			break;
		default:
			console.log(chalk.magenta(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('🪐 𝑁𝑄𝐻 ❤️  » ') + data);
			break;
		case "error":
			console.log(chalk.red('☄️ 𝑁𝑄𝐻 ❤️  » ') + data);
			break;
		default:
			console.log(chalk.green(`🎏 𝑁𝑄𝐻 ❤️  » `) + data);
			break;
	}
}