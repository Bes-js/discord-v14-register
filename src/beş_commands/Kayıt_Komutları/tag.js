const moment = require("moment");
require("moment-duration-format");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const beş_config = require("../../../beş_config.json")
module.exports = {name: "tag",aliases: ["tag"],execute: async (client, message, args, beş_embed) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(member){message.reply({ content: `> **${beş_config.userTag ? beş_config.userTag[0] : "5"} ${member.user.username}${beş_config.etiketTag ? `#${beş_config.etiketTag[0]}` : "0005"}**`}) }else if(!member){message.reply({ content: `> **${beş_config.userTag ? beş_config.userTag : "5"} ${beş_config.etiketTag ? `#${beş_config.etiketTag}` :""}**`}) }}}
