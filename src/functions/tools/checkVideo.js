
const Parser = require("rss-parser");
const parser = new Parser();
const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.checkVideo = async () => {
    const data = await parser
      .parseURL(
        "https://youtube.com/feeds/videos.xml?channel_id=UCJFTN5bUdp5nI-g3hCKbaxA"
      )
      .catch(console.error);

    const rawData = fs.readFileSync(`${__dirname}/../../json/video.json`);
    const jsonData = JSON.parse(rawData);

    if (jsonData.id !== await data.items[0].id) {
      fs.writeFileSync(
        `${__dirname}/../../json/video.json`,
        JSON.stringify({ id: data.items[0].id })
      );

      const guild = await client.guilds
        .fetch('1290919853833846824')
        .catch(console.error);
      const channel = await guild.channels
        .fetch('1290944904528396288')
        .catch(console.error);

      const { title, link, id, author } = data.items[0];
      const embed = new EmbedBuilder({
        title: title,
        url: link,
        timestamp: Date.now(),
        image: {
          url: (`https://img.youtube.com/vi/${id.slice(9)}/hqdefault.jpg`),
        },
        author: {
          name: author,
          icon_url: "https://yt3.googleusercontent.com/DBQs-HRmDtTnZbTE50De59wrjckNXHt1qQHHed_SC4v6xMv26-u3E3F5UT4wbvbhprdAKJ1NaQ=s160-c-k-c0x00ffffff-no-rj",
          url: "https://youtube.com/@chezthechicken/?sub_confirmation=1",
        },
        footer: {
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        },
      });

      await channel.send({ embeds: [embed], content:`<@&1293322611887181937> ChezTheChicken has released a new video`}).catch(console.error);
    }
  };
};