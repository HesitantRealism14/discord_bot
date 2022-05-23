require("dotenv").config();
const { Client, Intents } = require('discord.js');
const fetch = require("node-fetch");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable"]
encouragements = [
  "Cheer up!",
  "Hang in there.",
  "You are a great person / bot!"
]

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on("messageCreate", msg => {
  if (msg.author.bot) return

  if (msg.content == "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }
  if (msg.content== "ping") {
    msg.reply("pong");
  }
  if (sadWords.some(word => msg.content.includes(word))) {
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
    msg.reply(encouragement)
  }
})

client.login(process.env.TOKEN)
