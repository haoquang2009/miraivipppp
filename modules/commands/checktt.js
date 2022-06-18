module.exports.config = {
    name: "checktt",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Kiểm tra lượt tương tác trong nhóm",
    commandCategory: "system",
    usages: "[all/tag]",
    cooldowns: 5,
    envConfig: {
        "maxColumn": 250
    }
};

module.exports.run = async function ({ args, api, event, Currencies }) {
    var mention = Object.keys(event.mentions);
    const data = await api.getThreadInfo(event.threadID);
    if (args[0] == "all") {
        var number = 0, msg = "", storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
        });
        for (const lastData of exp) {
            number++;
            msg += `${number}. ${lastData.name} 𝙫𝙤̛́𝙞 ${lastData.exp} 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 \n`;
        }
        return api.sendMessage(msg, event.threadID);
    }
    else if (mention[0]) {
        var storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});

        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
        });
        const rank = exp.findIndex(info => parseInt(info.uid) == parseInt(mention[0])) + 1;
        const infoUser = exp[rank - 1];
        return api.sendMessage(`${infoUser.name} 𝙙𝙪̛́𝙣𝙜 𝙝𝙖̣𝙣𝙜 ${rank} 𝙫𝙤̛́𝙞 ${infoUser.exp} 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣`, event.threadID);
    }
    else {
        var storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
        });
        const rank = exp.findIndex(info => parseInt(info.uid) == parseInt(event.senderID)) + 1;
        const infoUser = exp[rank - 1];
        return api.sendMessage(`𝘽𝙖̣𝙣 𝙙𝙪̛́𝙣𝙜 𝙝𝙖̣𝙣𝙜 ${rank} 𝙫𝙤̛́𝙞 ${infoUser.exp} 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣`, event.threadID);
    }
    }