const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require('quick.db');
const beş_config = require("../../../beş_config.json")
const limit = new Map();
const ms = require("ms")
module.exports = {name: "kayıt-stat",aliases: ["kayıtlarım", "register-stat", "reg-stat","teyit-stat"],execute: async (client, message, args, beş_embed) => {if(!message.member.roles.cache.has(beş_config.staffRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));
var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
if(member) {let erkek = db.fetch(`erkek_${member.id}`) || 0;
let kadın = db.fetch(`kadın_${member.id}`) || 0;
message.reply({ embeds: [beş_embed.setDescription(`> **${member}'ın Kayıt Verileri;**\n\n> **Toplam Kayıt: ${erkek+kadın}**\n> **Kadın Kayıt: ${kadın}**\n> **Erkek Kayıt: ${erkek}**`)] });};}}
