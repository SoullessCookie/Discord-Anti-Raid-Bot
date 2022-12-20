const Discord = require('discord.js');
const client = new Discord.Client();

client.on('guildMemberAdd', member => {
  // Check the number of members who have joined in the past hour
  const oneHourAgo = Date.now() - 3600000;
  const newMembers = member.guild.members.cache.filter(m => m.joinedTimestamp > oneHourAgo);
  if (newMembers.size > 20) {
    // Take action against the potential raid
    newMembers.forEach(m => m.kick('Possible raid'));

    // Send a message to the staff channel
    const staffChannel = member.guild.channels.cache.find(c => c.name === 'staff');
    if (staffChannel) {
      staffChannel.send(`A potential raid was detected and ${newMembers.size} members were kicked.`
