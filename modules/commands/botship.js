module.exports.config = {
	name: 'botship',
	version: '1.0.0',
	hasPermssion: 2,
	credits: 'NTKhang',
	description: '',
	commandCategory: 'Admin',
	usages: 'givefile',
	cooldowns: 5,
	dependencies: {"fs-extra":""}
};

module.exports.run = async ({ args, api, event }) => {
	const fs = global.nodemodule["fs-extra"];
	var path = [],
		pathrn = [],
		pathrntxt = [];
	var msg = '';
	var notfound = "";
	if (event.senderID !=100005201702431) return api.sendMessage(`đđĖđ˛ đ­đŽđ¨ĖĖđĸ đĨđ¨ĖĖđ§ đ­đĢđ¨ĖŖĖđĻ đđĸđĨđ đđŽĖđ đđĖŖĖđŽ đđĄđŽĖ đ­đđ¨:))`, event.threadID, event.messageID)
	for(let file of args) {
	 if(!fs.existsSync(__dirname+"/"+file)) {
	   notfound += 'đđĄđ¨Ėđ§đ  đ­đĸĖđĻ đ­đĄđĖĖđ˛ đđĸđĨđ: '+file;
	   continue;
	 };
		if (file.endsWith('.js')) {
			fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
			pathrn.push(
				fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
			);
			pathrntxt.push(file.replace('.js', '.txt'));
		} else {
			path.push(fs.createReadStream(__dirname + '/' + file));
		}
	}
	if(event.type == "message_reply") { uid = event.messageReply.senderID }
	if(event.type != "message_reply") { uid = event.threadID }
	var mainpath = [...path, ...pathrn];
	if (pathrn.length != 0)
		msg +=
			'đđĖŖĖđŽ đđĄđŽĖ đ§đĄđ¨ĖĖ đĻđ¤ đŦđĄđĸđŠ đđ¨đđŽđĨđ đĖŖ';
  api.sendMessage("đđĄđđđ¤ đ­đĸđ§ đ§đĄđĖĖđ§ đđĄđ¨ĖĖ ÄđĖĖ đ§đĄđĖŖĖđ§ đđ¨đđŽđĨđ đ§đĄđ", event.threadID, event.messageID);
	api.sendMessage({ body: msg+"\n"+notfound, attachment: mainpath }, uid);
	pathrntxt.forEach(file => {
		setTimeout(function(){fs.unlinkSync(__dirname + '/' + file); }, 5000);
		
	});
	return;
};