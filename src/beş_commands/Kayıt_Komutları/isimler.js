const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const beş_config = require("../../../beş_config.json")
module.exports = {name: 'isimler',aliases: ["names", "nicknames"],execute: async (client, message, args, beş_embed) => {
var member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!message.member.roles.cache.has(beş_config.staffRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).then((beş) => setTimeout(() => { beş.delete(); }, 10000));
if (!member) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
let names = db.get(`isimler_${member.id}`);
if (!names) return message.reply({ embeds: [beş_embed.setDescription(`> **${member} Kullanıcısının İsim Verisi Bulunmamakta!**`)] }).then((beş) => setTimeout(() => { beş.delete(); }, 10000));
message.reply({ embeds: [beş_embed.setTitle("Kullanıcının Geçmiş Verileri").setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n"))] }).then((beş) => setTimeout(() => { beş.delete(); }, 10000));
    }
}
