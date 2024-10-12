const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "Over The Flock",
        status: "online",
      } /*,
        {
            type: ActivityType.Watching,
            text: "ChezTheChicken's Stream",
            status: "online"
        }*/,
    ];

    const option = Math.floor(Math.random() * options.length);

    client.user.setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      });
  };
};
