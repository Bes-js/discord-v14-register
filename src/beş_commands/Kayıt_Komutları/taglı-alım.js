const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require('quick.db');
const beş_config = require("../../../beş_config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {name: "taglı-alım",aliases: [],execute: async (client, message, args, beş_embed) => {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
if (!args[0]) return message.reply("> **.taglı-alım aç/kapat**")
if (args[0] != "aç") {if (args[0] != "kapat") {return message.reply("> **.taglı-alım aç / kapat**")}}
if(args[0] === "aç"){db.set(`taglialim_${message.guild.id}`,true)
message.reply(`> **Başarıyla Taglı Alım Modu Açıldı!**`)}else if(args[0] === "kapat"){db.delete(`taglialim_${message.guild.id}`)
message.reply(`> **Başarıyla Taglı Alım Modu Kapatıldı!**`)}}}
