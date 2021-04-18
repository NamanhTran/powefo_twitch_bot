const config = require('config');

class streamElementsPointsBot {
    constructor(channelName, twitchApi, streamElementsApi) {
        this.channelName = channelName
        this.twitch = twitchApi;
        this.streamElements = streamElementsApi;
        this.minSec = config.get('minSec');
        this.maxPoints = config.get('maxPoints');

        // Initalize a set to keep track of all users and a hashtable to keep track of the user's last message time
        this.userTable = {};
        this.userSet = new Set();
    }

    async onMessage(client, target, context, msg, self) {
        // If the channel is not live then exit
        if (await this.twitch.getStreamInfo(this.channelName) === undefined) {
            console.log(`${this.channelName} is not live.`);
            return; 
        }

        // Get the username
        const username = context.username;

        // Check if user exists in the set
        if (!this.userSet.has(username)) {
            // Get the current date
            const currDate = new Date();

            // Assign the current date to the user
            this.userTable[username] = currDate;

            // Add the user to the set
            this.userSet.add(username);

            console.log(`added ${username}`);
        }

        // If the user already exists then check if n seconds has passed
        else if (this.userSet.has(username)) {
            // Get the current date
            const currDate = new Date();

            // If n seconds has passed then replace old time with current time
            if (this.hasTimePassed(this.minSec, this.userTable[username], currDate)) {
                // Get the user's last date
                this.userTable[username] = currDate;

                // Add points to the user's stream elements
                const isPointsUpdated = await this.streamElements.addPointsToUser(username, this.maxPoints);

                // If there is an error then return false
                if (!isPointsUpdated) {
                    client.say(target, "Matt, tell Namanh something went wrong.");
                    return;
                }

                return;
            }
        }

        return;
    }

    // Check if at least n seconds has passed between two date objects
    hasTimePassed (minSeconds, date1, date2) {
        // Convert both dates to seconds
        const date1Sec = date1.getTime() / 1000;
        const date2Sec = date2.getTime() / 1000;
    
        // If n seconds has passed
        if (date2Sec - date1Sec >= minSeconds) {
            return true;
        }
    
        return false;
    }
}

module.exports = streamElementsPointsBot;