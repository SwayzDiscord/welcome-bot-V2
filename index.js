// connecting to discord
const Discord = require('discord.js')

// connect us to the config.json file
const config = require('./config.json');

// create a new Discord Client 
const Client = new Discord.Client({disableEveryone: true, partials: ['MESSAGE', 'REACTION']});

// we make a new system for the cmds
Client.commands = new Discord.Collection();

// require the fs module
const fs = require('fs');

const db = require('quick.db')

// it creates a new function for our aliases
Client.aliases = new Discord.Collection()

const Canvacord = require('canvacord');

const map = new Map();

const fetch = require('node-fetch')

Client.on("guildMemberAdd", async (member) => {


    let background;
    let backgrounds = db.fetch(`background_${member.guild.id}`)
    if(backgrounds == null) {
        background = 'https://esportsone.com/wp-content/uploads/2019/08/MedalBot-1.png'
    } else {
        background = backgrounds
    }
    const avatar = member.user.displayAvatarURL({dynamic: false})
    const title = member.user.username
    const Member12 = member.guild.memberCount
    const sub = `Member ${Member12}`
    const color = 'ORANGE'
    const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/welcomebanner?background=${background}&avatar=${avatar}&title=${title}&subtitle=${sub}&textcolor=${color}`, {
        headers: {
            'APIKEY': 'f8xftlruivhjdRn85zYJoSxBrDcDj2Pxu0Loa8'
        }
    })

    
    const welcomechannel = db.fetch(`welcomeChannel_${member.guild.id}`)
    if(welcomechannel == null) {
        return
    } else {
        const Wchannel =  member.guild.channels.cache.get(welcomechannel)
        let Image = await res.buffer()
        const WImage = new Discord.MessageAttachment(Image)
        Wchannel.send(`Welcome to the server ${member}`, WImage)
    }

})
