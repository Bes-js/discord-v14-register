const db = require("quick.db");
const beş_config = require("../../beş_config.json");
const moment = require("moment");
const client = global.client;
moment.locale("tr");
require("moment-duration-format");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
module.exports = async (member) => {
const beş_button = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('beş_register_button').setLabel(beş_config.clientFooter).setStyle(3).setDisabled(true))
var kurulus = (Date.now() - member.user.createdTimestamp);
var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) {üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
return {
'0': "SAYI EMOJİ 0",
'1': "SAYI EMOJİ 1",
'2': "SAYI EMOJİ 2",
'3': "SAYI EMOJİ 3",
'4': "SAYI EMOJİ 4",
'5': "SAYI EMOJİ 5",
'6': "SAYI EMOJİ 6",
'7': "SAYI EMOJİ 7",
'8': "SAYI EMOJİ 8",
'9': "SAYI EMOJİ 9"}[d];
})}
if (kurulus > 604800000) {
member.roles.add(beş_config.joinRole);
member.setNickname(beş_config.joinName);
client.kanalbul(beş_config.welcomeChat).send({content:`> **🎉 Sunucumuza Hoşgeldin ${member}**\n\n> **Seninle Beraber Sunucumuz ${üyesayısı} Üye Sayısına Ulaştı. Hesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Önce Oluşturulmuş,Sunucumuza <t:${Math.floor(Date.now() / 1000)}:R> Giriş Yaptın!**\n\n> **Kayıt Olmak İçin <@&${beş_config.staffRole}> Rolündeki Yetkililerimizi Etiketleyebilir Ve V.Confirmation Odalarına Geçerek Kayıt Olabilirsin.**\n\n> **Kayıt Olduktan Sonra Kurallar Kanalını Okuduğunuzu Kabul Edeceğiz Ve İçeride Yapılacak Cezalandırma İşlemlerini Bunu Göz Önünde Bulundurarak Yapacağız.**\n\n> **Tagımız: \`\`${beş_config.userTag ? beş_config.userTag : "Beş_Error"}\`\`'ı Alarak Bize Destek Olabilirsin, İyi Sohbetler Dileriz.**`,components:[beş_button]})
} else {
member.roles.add(beş_config.jailRole);
member.setNickname(beş_config.jailName);
client.kanalbul(beş_config.welcomeChat).send({ content: `> **⚠ ${member}, Kullanıcısı Sunucuya Katıldı Hesabı <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Önce Açıldığı İçin Şüpheli Rolü Verildi.**\n> **Sunucumuza <t:${Math.floor(Date.now() / 1000)}:R> Zamanında Giriş Yaptı!**`,components:[beş_button]})}}
module.exports.conf = {name: "guildMemberAdd"}