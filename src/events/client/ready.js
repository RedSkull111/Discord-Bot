module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! ${client.user.tag} is logged in and online.`);

        client.pickPresence;
        setInterval(client.checkVideo, 5 * 1000);
    },
};