const TwitchBot = require('twitch-bot');
const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const bot = new TwitchBot({
	username: process.env.username,
	oauth: process.env.oauth,
	channels: ['ihadtomakeanewaccount21'],
});

client.login(process.env.token);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

bot.on('message', chatter => {
	client.channels.cache
		.get('747238767043018832')
		.send(`${chatter.display_name}: ${chatter.message}`);
});

client.on('message', async message => {
	if (message.author.bot) return;

	bot.say(`${message.member.user.tag}: ${message.content}`);
});
