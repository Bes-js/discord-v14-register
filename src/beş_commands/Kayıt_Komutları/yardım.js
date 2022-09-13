const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const beş_config = require("../../../beş_config.json")
module.exports = {name: "yardım",aliases: ["help"],execute: async (client, message, args, beş_embed) => {     
const beş_dropdown = new ActionRowBuilder()
.addComponents(new SelectMenuBuilder().setCustomId('yardım').setPlaceholder(`Komutlar`).addOptions([{label:`Bot Komutları`,description:`${beş_config.clientFooter}`,value:`kayıtkomut`,emoji:`🛠`}])) 
message.channel.send({content:`> **Komutlara Aşşağıdaki Menüden Ulaşabilirsiniz!**`,components:[beş_dropdown]})}}