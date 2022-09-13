const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
module.exports = async button => {
 if(button.isSelectMenu()){
if(button.customId === `yardım`){
 const value = button.values[0];
await button.deferReply({ephemeral:true})
if (value === "kayıtkomut") {
await button.followUp({content:`
\`\`\`fix
.kayıt @Beş / ID | .e @Beş / ID | .k @Beş / ID
.isimler @Beş / ID
.isim @Beş / ID
.kayıtsız @Beş / ID
.kullanıcı-bilgi @Beş / ID
.tag / .tag @Beş / ID
.kayıt-stat @Beş / ID 
.yardım
.taglı-alım aç / kapat

.eval ("Bot Sahibine Özel")
\`\`\``})
}}}}
module.exports.conf = {name: "interactionCreate"}
