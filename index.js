const TwitchBot = require('twitch-bot');
const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const bot = new TwitchBot({
	username: process.env.username,
	oauth: process.env.oauth,
	channels: [`${process.env.channel}`],
});

client.login(process.env.token);

client.on('ready', () => {
	let embed = new Discord.MessageEmbed()
		.setTitle(`Connected to ${process.env.channel}'s twitch chat!`)
		.setColor(`RANDOM`)

	client.channels.cache.get('747238767043018832').send(embed);

	console.log(`Logged in as ${client.user.tag}!`);
});

bot.on('message', chatter => {
	client.channels.cache.get('747238767043018832').send(`${chatter.display_name}: ${chatter.message}`);
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.name !== 'twitch-chat') return;

	bot.say(`${message.member.user.tag}: ${message.content}`);
});
