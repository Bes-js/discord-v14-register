const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true,intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],ws: {version: "10"}});
const beş_config = require("./beş_config.json")
const { readdir } = require("fs");
const beş_db = require("quick.db");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
readdir("./src/beş_commands/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/beş_commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let beş_prop = require(`./src/beş_commands/${f}/` + file);
console.log(`🧮 [BEŞ - COMMANDS] ${beş_prop.name} Yüklendi!`);
commands.set(beş_prop.name, beş_prop);
beş_prop.aliases.forEach(alias => {aliases.set(alias, beş_prop.name);});});});});});
readdir("./src/beş_events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let beş_prop = require(`./src/beş_events/${file}`);
if (!beş_prop.conf) return;
client.on(beş_prop.conf.name, beş_prop);
console.log(`📚 [BEŞ _ EVENTS] ${beş_prop.conf.name} Yüklendi!`);});});
client.on('userUpdate', async (oldUser, newUser) => {
if(!beş_config.userTag[0])return;
let Guild = client.guilds.cache.get(beş_config.guildID)
let Member = Guild.members.cache.get(oldUser.id);
if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
if(beş_config.userTag.some(p => Member.user.username.includes(p)) && !Member.roles.cache.has(client.rolbul(beş_config.teamRoleName).id)){
client.kanalbul(beş_config.tagLog).send({embeds:[new EmbedBuilder().setColor(`#00ff00`).setDescription(`> **${newUser} İsmine \`Tagımızı\` Alarak Ailemize Katıldı!**\n\n**Önceki Kullanıcı Adı: \`${oldUser.tag}\`**\n**Sonraki Kullanıcı Adı: \`${newUser.tag}\`**`)]})
Member.roles.add(client.rolbul(beş_config.teamRoleName).id).catch();
client.kanalbul(beş_config.generalChat).send(`> **🎉 Tebrikler, ${newUser} Tag Alarak Ailemize Katıldı! Hoşgeldin.**`)
}});
client.on('userUpdate', async (oldUser, newUser) => {
if(!beş_config.userTag[0])return;
if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
let Guild = client.guilds.cache.get(beş_config.guildID)
let Member = Guild.members.cache.get(oldUser.id);
if(beş_config.userTag.some(p => !Member.user.username.includes(p)) && Member.roles.cache.has(client.rolbul(beş_config.teamRoleName).id)){
if(beş_config.etiketTag.some(p => newUser.discriminator.includes(p))) {return} else{
client.kanalbul(beş_config.tagLog).send({embeds:[new EmbedBuilder().setColor(`#ff0000`).setDescription(`> **${newUser} İsmine \`Tagımızı\` Çıkarttı Ailemizden Ayrıldı!**\n\n**Önceki Kullanıcı Adı: \`${oldUser.tag}\`**\n**Sonraki Kullanıcı Adı: \`${newUser.tag}\`**`)]})
let role = Guild.roles.cache.get(client.rolbul(beş_config.teamRoleName).id);
let roles = Member.roles.cache.clone().filter(e => e.managed || e.position < role.position);
await Member.roles.set(roles).catch();
}}});
client.on("userUpdate", async(oldUser, newUser) => {
if(!beş_config.userTag[0])return;
if(oldUser.discriminator == newUser.discriminator || oldUser.bot || newUser.bot) return;
let Guild = client.guilds.cache.get(beş_config.guildID)
let Member = Guild.members.cache.get(oldUser.id)
if(beş_config.etiketTag.some(p => oldUser.discriminator.includes(p)) && beş_config.etiketTag.some(c => !newUser.discriminator.includes(c))) {
if(beş_config.userTag.some(p => Member.user.username.includes(p))){return;}
client.kanalbul(beş_config.tagLog).send({embeds:[new EmbedBuilder().setDescription(`> **${newUser} İsmine \`Tagımızı\` Çıkarttı Ailemizden Ayrıldı!**\n\n**Önceki Kullanıcı Adı: \`${oldUser.tag}\`**\n**Sonraki Kullanıcı Adı: \`${newUser.tag}\`**`).setColor(`#ff0000`)]})
let role = Guild.roles.cache.get(client.rolbul(beş_config.teamRoleName).id);
let roles = Member.roles.cache.clone().filter(e => e.managed || e.position < role.position);
await Member.roles.set(roles).catch();
}
if(beş_config.etiketTag.some(p => !oldUser.discriminator.includes(p)) && beş_config.etiketTag.some(c => newUser.discriminator.includes(c))) {
Member.roles.add(client.rolbul(beş_config.teamRoleName).id)
client.kanalbul(beş_config.tagLog).send({embeds:[new EmbedBuilder().setDescription(`> **${newUser} İsmine \`Tagımızı\` Alarak Ailemize Katıldı!**\n\n**Önceki Kullanıcı Adı: \`${oldUser.tag}\`**\n**Sonraki Kullanıcı Adı: \`${newUser.tag}\`**`).setColor(`#00ff00`)]})
client.kanalbul(beş_config.generalChat).send(`> **🎉 Tebrikler, ${newUser} Tag Alarak Ailemize Katıldı! Hoşgeldin.**`)
}})
Collection.prototype.array = function() {return [...this.values()]}
client.kanalbul = function(kanalisim) {let kanal = client.guilds.cache.get(beş_config.guildID).channels.cache.find(k => k.name === kanalisim)
return kanal;}
client.rolbul = function(rolisim) {let rol = client.guilds.cache.get(beş_config.guildID).roles.cache.find(r => r.name === rolisim)
return rol;}
client.rolinc = function(rolisim) {let rol = client.guilds.cache.get(beş_config.guildID).roles.cache.find(r => r.name.includes(rolisim))
return rol;}
client.login(beş_config.token).then(() => console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)).catch((beş_err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${beş_err}`));
