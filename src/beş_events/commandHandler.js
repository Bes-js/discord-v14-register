const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const beş_config = require("../../beş_config.json");
const ms = require('ms');
module.exports = async (message) => {
if (beş_config.prefix && !message.content.startsWith(beş_config.prefix)) return;
const args = message.content.slice(1).trim().split(/ +/g);
const commands = args.shift().toLowerCase();
const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
const beş_embed = new EmbedBuilder().setColor(`#2f3136`).setAuthor({name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: beş_config.clientPresence ? beş_config.clientPresence : `Beş Was Here` , iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })})
if (cmd) {if(client.kanalbul(beş_config.commandLog)){client.kanalbul(beş_config.commandLog).send(`> **\`${message.member.user.tag}\` Kullanıcısı <#${message.channel.id}> Kanalında \`.${cmd.name}\` Komudunu Kullandı!**`)}
cmd.execute(client, message, args, beş_embed); }}
module.exports.conf = {name: "messageCreate"}
