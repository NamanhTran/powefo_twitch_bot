const tmi = require('tmi.js');
const config = require('config');

const twitchAPI = require('../api/twitch');
const streamElementsAPI = require('../api/streamElements');
const streamElementsPointsBot = require('./streamElementsPointsBot');

class TwitchChatBot {
    constructor() {
        // Get all information from the config
        this.channelName = config.get('channelName');
        this.botUsername = config.get('bot.username');
        this.botToken = config.get('bot.token');
        this.twitchClientId = config.get('twitch.clientId');
        this.twitchClientSecret = config.get('twitch.clientSecret');
        this.streamElementsToken = config.get('streamElements.token');
        
        // Initalize twitch API
        this.twitch = new twitchAPI(this.twitchClientId, this.twitchClientSecret);

        // Initalize StreamElements API
        this.streamElements = new streamElementsAPI(this.channelName, this.streamElementsToken);

        // Initalize our StreamElements Points Bot
        this.streamElementsPointsBot = new streamElementsPointsBot(this.channelName, this.twitch, this.streamElements);
    }

    // Connects to twitch chat
    connectToTwitchChat() {
        // Configure the twitch bot options
        const opts = {
            identity: {
              username: this.botUsername,
              password: this.botToken
            },
            channels: [
              this.channelName
            ]
        };

        // Create a client with our options
        this.client = new tmi.client(opts);

        // Register our event handlers
        this.client.on('message', this.onMessageHandler.bind(this));
        this.client.on('connected', this.onConnectedHandler.bind(this));

        // Connect to channel twitch chat
        this.client.connect();
    }

    // Called every time a message comes in
    async onMessageHandler (target, context, msg, self) {
        // Ignore messages from the bot
        if (self) { return; }
        
        // Call the stream elements points bot on every message
        await this.streamElementsPointsBot.onMessage(this.client, target, context, msg, self);
    }

    // Called every time the bot connects to Twitch chat
    onConnectedHandler (addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }
}

module.exports = TwitchChatBot;