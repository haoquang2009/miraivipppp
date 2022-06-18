module.exports.config = {
  name: "violet",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kadeer",
  description: "Ảnh Violet",
  commandCategory: "Edit-IMG",
  usages: "𝐄𝐝𝐢𝐭-𝐈𝐦𝐠",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apiviolet.hungnguyen201.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `🌸Violet 𝗻𝗲̀ <𝟯\n🌸𝗦𝗼̂́ 𝗮̉𝗻𝗵 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼́: ${count} 𝗮̉𝗻𝗵`,
            attachment: fs.createReadStream(__dirname + `/cache/violet.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/violet.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/violet.${ext}`)).on("close", callback);
      })
}