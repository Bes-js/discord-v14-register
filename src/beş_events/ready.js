const beş_config = require("../../beş_config.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client;
module.exports = () => {
client.user.setPresence({activities:[{name: beş_config.clientPresence ? beş_config.clientPresence : `Beş Was Here`,type: ActivityType.Streaming,url:"https://www.twitch.tv/bes_exe"}], status: "dnd" });
const beş_kanal = client.channels.cache.get(beş_config.voiceChannel);
if(!beş_kanal)return
joinVoiceChannel({channelId: beş_kanal.id,guildId: beş_kanal.guild.id,adapterCreator: beş_kanal.guild.voiceAdapterCreator,selfDeaf: true,selfMute:true});}
module.exports.conf = {name: "ready"}
