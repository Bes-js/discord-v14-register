const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {name: "kullanıcı-bilgi",aliases: ["bilgi", "kb"],execute: async (client, message, args, beş_embed) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  message.reply({ embeds: [beş_embed.setDescription(`**
• Kullanıcı: (<@${member.id}> - \`${member.id}\`) (${member.roles.highest})
• Hesap Kurulum Tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
• Sunucuya Katılma Tarihi: <t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)
• Rolleri: ${(member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Üzerinde Hiç Rol Bulunmamakta!')}
• Avatar: [Tıkla](${member.user.avatarURL({dynamic:true})})**
`).setThumbnail(member.user.avatarURL({dynamic:true})).setTitle(`${member.user.tag} Kullanıcı Bilgileri`).setImage(message.guild.bannerURL({dynamic:true,size: 4096})).setURL(`https://linktr.ee/beykant`)] });

    }
}
