module.exports.config = {
    name: "animeinfo",
    version: "1.0.0",
    hasPermision: 0,
    credit: "BLACK",
    description: "Thรดng tin vแป phim anime",
    commandCategory: "Tiแปn รch",
    usages: "[name anime]",
    cooldowns: 0,
};

module.exports.run = async function({
    api,
    event,
    args,
    utils,
    Users,
    Threads
}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request")
        let {
            threadID,
            senderID,
            messageID
        } = event;
        if (!args[0]) {
            api.sendMessage("๐๐ฎ๐ข ๐ฅ๐จฬ๐ง๐  ๐ง๐ก๐ฬฃฬ๐ฉ ๐ญ๐ฬ๐ง ๐๐ง๐ข๐ฆ๐", threadID, messageID)
        }
        const res = await axios.get(encodeURI(`https://api-ttk.herokuapp.com/other/anime?name=${args[0]}`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `๐๐ฬ๐ง ๐ฉ๐ก๐ข๐ฆ ๐: ${data.title}\n๐๐๐ ๐: ${data.url}\n๐๐จฬฃฬ๐ข ๐๐ฎ๐ง๐  ๐: ${data.noidung}\n๐๐ฬฬ๐ฉ ๐ก๐ฬฃ๐ง๐  ๐: ${data.xephang}\n๐๐จฬฬ ๐ญ๐ฬฃฬ๐ฉ ๐: ${data.episodes}`,
                attachment: fs.createReadStream(__dirname + `/cache/anime.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anime.png`), event.messageID);
        };
        return request(encodeURI(data.picture))
            .pipe(fs.createWriteStream(__dirname + `/cache/anime.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`ฤ๐ฬ ๐ฑ๐ฬ๐ฒ ๐ซ๐ ๐ฅ๐จฬฬ๐ข`, event.threadID)
    }
}