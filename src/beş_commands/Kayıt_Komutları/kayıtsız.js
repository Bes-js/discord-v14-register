const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require("quick.db");
const beş_config = require("../../../beş_config.json")
module.exports = {name: "unregistered",aliases: ["unreg", "ks", "kayıtsız"],execute: async (client, message, args, beş_embed) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!message.member.roles.cache.has(beş_config.staffRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
if(!member) { message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)] });
return }
if(message.author.id === member.id){ message.reply({ embeds: [beş_embed.setDescription(`> **Kendinmi? zort :D!**`)] });
return}
await member.roles.cache.has(beş_config.boosterRole) ? member.roles.set([beş_config.boosterRole,beş_config.joinRole]) : member.roles.set([beş_config.joinRole])
await member.setNickname(beş_config.joinName)
message.reply({ embeds: [beş_embed.setDescription(`> **${member} Kullanıcısı Başarıyla Kayıtsıza <@&${beş_config.joinRole}> Atıldı.**`)] });
}}