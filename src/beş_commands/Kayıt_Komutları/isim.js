const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const beş_config = require("../../../beş_config.json")
const db = require("quick.db");
module.exports = {name: "isim",aliases: ["i", "nickname"],execute: async (client, message, args, beş_embed) => {
var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
var name = args[1]
const age = args[2]
if (!message.member.roles.cache.has(beş_config.staffRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
const kyapan = await client.users.fetch(message.author.id) 
if (!member) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
if (!name) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir İsim Belirt!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
if (!age) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir Yaş Belirt!**`)] });
if (isNaN(age)) return message.reply({ embeds: [beş_embed.setDescription(`> **Yaşı Lütfen Sayı İle Belirt!**`)] });
if (age < beş_config.minageAge) return message.reply({ embeds: [beş_embed.setDescription(`> **Kullanıcının Yaşı Geçerli Yaştan Küçük!**`)] });
let Name2 = name.toLocaleLowerCase()[0].toUpperCase() + name.toLocaleLowerCase().substring(1);
db.push(`isimler_${member.id}`, `\`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}\` ( İsim Değiştirme - ${kyapan.tag})`);
await message.guild.members.cache.get(member.id).setNickname(`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}`);
message.reply({ embeds: [beş_embed.setDescription(`> **Kullanıcının İsmi \`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}\` Olarak Değiştirildi!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}}
