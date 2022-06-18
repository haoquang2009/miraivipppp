module.exports.config = {
 name: "rankgif",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Siêu Đáng Yêu mod JRT",
 description: "Lấy rank hiện tại của bạn trên hệ thống bot kèm khung theo level của bạn, remake rank_card from canvacord",
 commandCategory: "Nhóm",
 cooldowns: 5,
 dependencies: {
 "fs-extra": "",
 "path": "",
 "jimp": "",
 "node-superfetch": "",
 "canvas": "",
 "gif-frames": "",
 "gifencoder": "",
 }
};
//random color 
function getRandomColor() {
 var letters = '0123456789ABCDEF';
 var color = '#';
 for (var i = 0; i < 6; i++) {
 color += letters[Math.floor(Math.random() * 16)];
 }
 return color;
}

module.exports.makeRankCard = async(data) => {
 /*
 * 
 * Remake from Canvacord
 * 
 */

 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];
 const Canvas = global.nodemodule["canvas"];
 const request = global.nodemodule["node-superfetch"];
 const GIFEncoder = global.nodemodule["gifencoder"];
 const gifFrames = global.nodemodule["gif-frames"];

 const __root = path.resolve(__dirname, "cache");
 const PI = Math.PI;

 const { id, name, rank, level, expCurrent, expNextLevel } = data;
 Canvas.registerFont(__root + "/bold-font.ttf", {
 family: "Manrope",
 weight: "regular",
 style: "normal"
 });
 Canvas.registerFont(__root + "/vnexotic.ttf", {
 family: "Manrope",
 weight: "bold",
 style: "normal"
 });
 //random rankcard by Siêu Đáng Yêu ,png by ngô đức hiển(xin vui lòng giữ credit),code by quang thái
 //sử dụng bao nhiêu cái chỉnh ở dòng 57 (số ảnh) và ảnh phải ở định dạng.png đặt tên rankcard(123)
 const pathCustom = path.resolve(__dirname, "cache", "customrank");
 var customDir = fs.readdirSync(pathCustom);
 let random = Math.floor(Math.random() * 23) + 1;
 var dirImage = __root + "/rankcard" + random + ".png";
 customDir = customDir.map(item => item.replace(/\.png/g, ""));

 for (singleLimit of customDir) {
 var limitRate = false;
 const split = singleLimit.split(/-/g);
 var min = parseInt(split[0]),
 max = parseInt((split[1]) ? split[1] : min);

 for (; min <= max; min++) {
 if (level == min) {
 limitRate = true;
 break;
 }
 }

 if (limitRate == true) {
 dirImage = pathCustom + `/${singleLimit}.png`;
 break;
 }
 }

 let rankCard = await Canvas.loadImage(dirImage);
 const pathImg = __root + `/rank_${id}.png`;

 var expWidth = (expCurrent * 615) / expNextLevel;
 if (expWidth > 615 - 18.5) expWidth = 615 - 18.5;

 let avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);

 avatar = await this.circle(avatar.body);

 const canvas = Canvas.createCanvas(934, 282);
 const ctx = canvas.getContext("2d");

 ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);
 ctx.drawImage(await Canvas.loadImage(avatar), 45, 50, 180, 180);

 ctx.font = `bold 36px Manrope`;
 ctx.fillStyle = getRandomColor();
 ctx.textAlign = "start";
 ctx.fillText(name, 270, 164);
 ctx.font = `36px Manrope`;
 ctx.fillStyle = getRandomColor();
 ctx.textAlign = "center";

 ctx.font = `bold 32px Manrope`;
 ctx.fillStyle = getRandomColor();
 ctx.textAlign = "end";
 ctx.fillText(level, 934 - 55, 82);
 ctx.fillStyle = getRandomColor();
 ctx.fillText("Lv.", 934 - 55 - ctx.measureText(level).width - 10, 82);

 ctx.font = `bold 32px Manrope`;
 ctx.fillStyle = getRandomColor();
 ctx.textAlign = "end";
 ctx.fillText(rank, 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 25, 82);
 ctx.fillStyle = getRandomColor();
 ctx.fillText("#", 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 16 - ctx.measureText(rank).width - 16, 82);

 ctx.font = `bold 26px Manrope`;
 ctx.fillStyle = getRandomColor();
 ctx.textAlign = "start";
 ctx.fillText("/ " + expNextLevel, 710 + ctx.measureText(expCurrent).width + 10, 164);
 ctx.fillStyle = getRandomColor();
 ctx.fillText(expCurrent, 710, 164);

 ctx.beginPath();
 ctx.fillStyle = getRandomColor();
 ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * PI, 0.5 * PI, true);
 ctx.fill();
 ctx.fillRect(257 + 18.5, 147.5 + 36.25, expWidth, 37.5);
 ctx.arc(257 + 18.5 + expWidth, 147.5 + 18.5 + 36.25, 18.75, 1.5 * PI, 0.5 * PI, false);
 ctx.fill();

 const imageBuffer = canvas.toBuffer();
 fs.writeFileSync(pathImg, imageBuffer);
 return pathImg;
}

module.exports.makeRankCardGif = async(data) => {
 /*
 * 
 * Remake from Canvacord
 * 
 */

 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];