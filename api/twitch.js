const axios = require('axios');

// Twitch API class that only has methods to get the stream info
class Twitch {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.authToken = new AuthToken();
    }

    // Gets an auth token from Twitch
    async getAuthToken() {
        const getTokenUrl = "https://id.twitch.tv/oauth2/token";

        try {
            const tokenResponse = await axios.post(getTokenUrl, null, { 
                params: {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: "client_credentials"
                }

            });

            this.authToken = new AuthToken(tokenResponse.data.access_token, tokenResponse.data.expires_in);

            console.log('API Response:', tokenResponse.data);
        } 

        catch(error) {
            console.log(error.response);
        }
    }

    // Gets the stream infomation
    async getStreamInfo(channelName) {
        console.log(this);
        // Checks if auth token is still valid
        if (!this.authToken.isValid()) {
            try {
                await this.getAuthToken();
            }
            catch(error) {
                console.log(`Error in regenerating authToken: ${error}`);
            }
        }

        try {
            const getStreamUrl = `https://api.twitch.tv/helix/streams`;

        
            const response = await axios.get(getStreamUrl, {
                headers: {
                    Authorization: `Bearer ` + this.authToken.token,
                    'Client-Id': this.clientId
                },

                params: {
                    user_login: channelName
                }

            });

            console.log(response.data.data[0]);

            return response.data.data[0];
        }

        catch(error) {
            console.log("Error for getting stream info:", error);
        }

        return undefined;
    }
};

// OAuth Token to check if the token is still valid
class AuthToken {
    constructor(token=null, expiresIn=-10) {
        this.token = token;
        this.tokenExpireDate = Math.round(Date.now() / 1000) + parseInt(expiresIn);
    }

    isValid() {
        // Current Epoch time
        const currentEpoch = Math.round(Date.now() / 1000)
        if (this.tokenExpireDate <= currentEpoch) {
            return false;
        }
        
        return true;
    }
}

module.exports = Twitch;