const axios = require('axios');
const config = require('config');

class StreamElements {
    constructor(channelName=null, token=null) {
        this.channelName = channelName;
        this.token = token;
        this.channelId = null;
    }

    async init() {
        this.channelId = await this.getChannelId();
    }

    async getChannelId() {
        try {
            // Add points API endpoint
            const url = `https://api.streamelements.com/kappa/v2/channels/${this.channelName}`;
    
            // Get the response
            const response = await axios.get(url, null, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });

            console.log(`Channel ID: ${response.data._id}`);
            
            return response.data._id;
        }
    
        catch(error) {
            console.log(`Get channel id error: ${error}`);
            return null;
        }
    }

    async addPointsToUser(username, points) {
        // Get the stream element channel ID if it doesn't exist
        if (this.channelId === null) {
            try {
                this.channelId = await this.getChannelId();
            }

            catch (error) {
                console.log(`Get channel id error: ${error}`);
                return;
            }
        }

        try {
            // Add points API endpoint
            const url = `https://api.streamelements.com/kappa/v2/points/${this.channelId}/${username}/${points}`;

            // Get the response
            const response = await axios.put(url, null, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            // Print who was given points
            console.log(`Channel ID: ${this.channelId} Username: ${username} Points: ${points}`);
    
        } catch (error) {
            console.log(`Set user points error: ${error}.`);
            return false;
        }

        return true;
    }
}

module.exports = StreamElements;