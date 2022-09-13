const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require("quick.db");
const beş_config = require("../../../beş_config.json")
const moment = require("moment");
module.exports = {name: "kayıt",aliases: ["k", "girl", "woman","e", "boy", "man","Man","Girl","Woman","woman","Boy","kız","erkek","KAYIT","Kayıt"],
execute: async (client, message, args, beş_embed) => {
if (!message.member.roles.cache.has(beş_config.staffRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));
const beş_dropdown = new ActionRowBuilder().addComponents(new SelectMenuBuilder().setCustomId('beş_kayıt_command').setPlaceholder(beş_config.clientFooter).addOptions([{label:`Erkek`,description:`Erkek Olarak Kayıt Et / ${beş_config.clientFooter}`,value:`man`,emoji:`${beş_config.manemoji}`},{label:`Kız`,description:`Kız Olarak Kayıt Et / ${beş_config.clientFooter}`,value:`woman`,emoji:`${beş_config.womanemoji}`},{label:`İptal`,description:`Kayıt İşlemini İptal Et / ${beş_config.clientFooter}`,value:`exit`,emoji:`❌`}])) 
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let name = args[1]
let age = args[2]
if (!member || !name) return message.reply({ embeds: [beş_embed.setDescription(`> **Yanlış Kullanım \`Örnek: .kayıt <@Beş> / ID İsim Yaş\`**`)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
    if (!age || isNaN(age)) return message.reply({ embeds: [beş_embed.setDescription("> **Geçerli Bir Yaş Belirtin!**")] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
if(db.get(`taglialim_${message.guild.id}`)){
if (beş_config.userTag.some(tag => !member.user.username.includes(tag)) || beş_config.etiketTag.some(etket => !member.user.tag.includes(etket))){return message.reply({ embeds: [beş_embed.setDescription(`> **Taglı Alım Açık Olduğu İçin Sadece Taglı Kullanıcılar Kayıt Edilebilir!**`)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});}
}
if (name.lenght > 12) return message.reply(`> **İsim Uzunluğu 12'den Fazla Olamaz!**`).then(msg => {setTimeout(() => msg.delete(), 5000);});
if(age < beş_config.minageAge)return message.reply({ embeds: [beş_embed.setDescription(`> **Kayıt Yaşı ${beş_config.minageAge}'den/dan Küçük Olamaz!**`)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
let Name2 = name.toLocaleLowerCase()[0].toUpperCase() + name.toLocaleLowerCase().substring(1);
if (member.roles.cache.get(beş_config.manRole[0]) || member.roles.cache.get(beş_config.womanRole[0])) return message.reply({ embeds: [beş_embed.setDescription(`> **Kayıtlı Bir Kullanıcıyı Tekrar Kayıt Edemezsin!**`)]}).then(msg => {setTimeout(() => msg.delete(), 5000);});
if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [beş_embed.setDescription(`> **İşlem Geçersiz Senden Üst/Aynı Pozisyonda Birisini Kayıt Edemezsin!**`)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
const names = db.get(`isimler_${member.id}`)
let mesajbeş;
if(names){
mesajbeş = message.reply({ embeds: [beş_embed.setDescription(`> **Kullanıcının ismi** \`${Name2} ${beş_config.symbolBeş} ${age}\` **Olarak Değiştirilecek!**\n> **Butonlardan Kullanıcının Cinsiyetini Seçiniz.**\n\n> **Kullanıcının Toplamda " ${names.length} " İsim Kayıtı Mevcut.**\n${names.map((data) => `${data}`).join("\n")}`)], components: [beş_dropdown] })
} 
if(!names){
mesajbeş = message.reply({ embeds: [beş_embed.setDescription(`> **Kullanıcının ismi** \`${Name2} ${beş_config.symbolBeş} ${age}\` **Olarak Değiştirilecek!**\n> **Butonlardan Kullanıcının Cinsiyetini Seçiniz.**`)], components: [beş_dropdown] })}
const kyapan = await client.users.fetch(message.author.id) 
mesajbeş.then(b2 => {
const filter = i => i.user.id === message.member.id;
const collector = b2.createMessageComponentCollector({filter:filter, time: 30000 });
collector.on('collect', async b => {
if (!b.isSelectMenu()) return;
const value = b.values[0]

if (value === "man") {
db.add(`erkek_${message.author.id}`, 1)
db.push(`isimler_${member.id}`,`\`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}\` (<@&${beş_config.manRole[0]}> - ${kyapan.tag})`);
if (beş_config.userTag.some(tag => member.user.username.includes(tag)) || beş_config.etiketTag.some(etket => member.user.tag.includes(etket))) {
await member.roles.cache.has(beş_config.boosterRole) ? member.roles.set([beş_config.boosterRole,beş_config.manRole[0],beş_config.manRole[1],beş_config.tagRole]) : member.roles.set([beş_config.manRole[0],beş_config.manRole[1],beş_config.tagRole])
await member.setNickname(`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}`).catch(e => { })
} else {
await member.setNickname(`${beş_config.guildTag} ${Name2} ${beş_config.symbolBeş} ${age}`).catch(e => { })
await member.roles.cache.has(beş_config.boosterRole) ? member.roles.set([beş_config.boosterRole,beş_config.manRole[0],beş_config.manRole[1]]) : member.roles.set([beş_config.manRole[0],beş_config.manRole[1]])}
message.reply({ embeds: [beş_embed.setDescription(`> **<@${member.id}> Kullanıcının ismi** \`${Name2} ${beş_config.symbolBeş} ${age}\` **Olarak Değiştirildi**\n> **Ve ${beş_config.manemoji} <@&${beş_config.manRole[0]}> Rolü Verilerek Kayıt Edildi.**`).setFooter({text: beş_config.clientFooter})] })
client.kanalbul(beş_config.generalChat).send(`> **${beş_config.manemoji} ${member} Aramıza Hoşgeldin!**`).then((e) => setTimeout(() => { e.delete(); }, 20000));}
if (value === "woman") {
db.add(`kadın_${message.author.id}`, 1)
db.push(`isimler_${member.id}`, `\`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}\` (<@&${beş_config.womanRole[0]}> - ${kyapan.tag})`);
if (beş_config.userTag.some(tag => member.user.username.includes(tag)) || beş_config.etiketTag.some(etket => member.user.tag.includes(etket))) {
await member.roles.cache.has(beş_config.boosterRole) ? member.roles.set([beş_config.boosterRole,beş_config.womanRole[0],beş_config.womanRole[1],beş_config.tagRole]) : member.roles.set([beş_config.womanRole[0],beş_config.womanRole[1],beş_config.tagRole])
await member.setNickname(`${beş_config.tagSymbol} ${Name2} ${beş_config.symbolBeş} ${age}`).catch(e => { })
} else {
await member.setNickname(`${beş_config.guildTag} ${Name2} ${beş_config.symbolBeş} ${age}`).catch(e => { })
await member.roles.cache.has(beş_config.boosterRole) ? member.roles.set([beş_config.boosterRole,beş_config.womanRole[0],beş_config.womanRole[1]]) : member.roles.set([beş_config.womanRole[0],beş_config.womanRole[1]])}
message.reply({ embeds: [beş_embed.setDescription(`> **<@${member.id}> Kullanıcının ismi** \`${Name2} ${beş_config.symbolBeş} ${age}\` **Olarak Değiştirildi**\n> **Ve ${beş_config.womanemoji} <@&${beş_config.womanRole[0]}> Rolü Verilerek Kayıt Edildi.**`).setFooter({text: beş_config.clientFooter})]})
client.kanalbul(beş_config.generalChat).send(`> **${beş_config.womanemoji} ${member} Aramıza Hoşgeldin!**`).then((e) => setTimeout(() => { e.delete(); }, 20000));}
if (value === "exit") {
message.delete();
await member.setNickname(beş_config.joinName)
message.channel.send({ embeds: [beş_embed.setDescription(`> **İşlem Başarıyla İptal Edildi!**`).setFooter({text: beş_config.clientFooter})]}).then(msg => {setTimeout(() => msg.delete(), 15000);});}
collector.stop()
b.message.delete().catch(e => { console.error(e) })})})}}