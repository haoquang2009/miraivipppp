module.exports.config = {
	name: "ping",
	version: "0.0.3",
	hasPermssion: ,
	credits: "Mirai Team",
	description: "tag toร n bแป thร nh viรชn",
	commandCategory: "Box Chat",
	usages: "[Text]",
	cooldowns: 10
};

module.exports.run = async function({ api, event, args, Threads }) { 
  const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '๐๐ต๐ฬ ๐ก๐ต๐ฎฬฃฬ๐'
  if (thu == 'Monday') thu = '๐ง๐ต๐ฬฬ ๐๐ฎ๐ถ'
  if (thu == 'Tuesday') thu = '๐ง๐ต๐ฬฬ ๐๐ฎ'
  if (thu == 'Wednesday') thu = '๐ง๐ต๐ฬฬ ๐ง๐ฬ'
  if (thu == "Thursday") thu = '๐ง๐ต๐ฬฬ ๐ก๐ฎฬ๐บ'
  if (thu == 'Friday') thu = '๐ง๐ต๐ฬฬ ๐ฆ๐ฎฬ๐'
  if (thu == 'Saturday') thu = '๐๐ก๐ฎฬฬ ๐๐ฬ๐ฒ'
const res = await axios.get("https://apikanna.khoahoang3.repl.co/");
//lแบฅy data trรชn web api
const data = res.data.data;
//tแบฃi แบฃnh xuแปng
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
	try {
		const botID = api.getCurrentUserID();
		var listAFK, listUserID;
		global.moduleData["afk"] && global.moduleData["afk"].afkList ? listAFK = Object.keys(global.moduleData["afk"].afkList || []) : listAFK = []; 
		listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
		listUserID = listUserID.filter(item => !listAFK.includes(item));
		var body = (args.length != 0) ? args.join(" ") : "๐๐ฬฃฬ๐ฒ ๐ซ๐ ๐ญ๐ฎฬ๐จฬ๐ง๐  ๐ญ๐ฬ๐ ๐ง๐ฬ๐จ ๐ฆ๐ฬฬ๐ฒ ๐๐จ๐ง ๐ฆ๐ฬฃฬ๐ญ ๐๐ฬ๐ฒ", mentions = [], index = 0;
		for(const idUser of listUserID) {
			body = "โ" + body;
			mentions.push({ id: idUser, tag: "โ", fromIndex: index - 1 });
			index -= 1;
		}

		return api.sendMessage({ body: `๐ฃ====๐๐๐ฬ๐๐ ๐๐ฬ๐====๐ฃ\n\n[๐ธ] - ${body}\n----------------------------\n[๐ฆ] - ๐๐ผฬ๐บ ๐ป๐ฎ๐ ๐น๐ฎฬ: ${thu} || ${gio}`, attachment: download, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}