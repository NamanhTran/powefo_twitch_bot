# powefo's Twitch Bot
Twitch bot for [powefo](https://www.twitch.tv/powefo)'s chat.

Currently only adds points to Stream Elements' points leaderboard for a user when they chat every x seconds.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

Requirements for the software and other tools to build, test and push 
- [NodeJS](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/) (comes with NodeJS)

### Installing

Follow these steps before running the twitch bot

cd into the project folder'

    cd <PATH TO PROJECT FOLDER>

First install the dependencies needed for this application

    npm install

And go to the `config` folder and edit the `default.json` file (remove the angle brackets when you add the value)

    {
        "channelName": <THE CHANNEL NAME YOU WANT TO USE THIS BOT ON>,

        "bot": {
            "username": <BOT'S USERNAME>,
            "token": <BOT'S OAUTH TOKEN ID>
        },

        "twitch": {
            "clientId": <TWITCH DEV CLIENT ID>,
            "clientSecret": <TWITCH DEV CLIENT SECRET>
        },

        "streamElements": {
            "token": <STREAM ELEMENTS TOKEN>
        },

        "maxPoints": <MAX POINTS GIVEN PER REQUEST>,
        "minSec": <TIME IN BETWEEN MESSAGES>
    }

- `<BOT'S USERNAME>` - is the username of the twitch account that is being used for this program
- `<BOT'S OAUTH TOKEN ID>` - [Use this to generate an OAuth token for your bot](https://twitchapps.com/tmi/)
- `<TWITCH DEV CLIENT ID>` - Go to https://dev.twitch.tv/ to register this application and gain the client id
- `<TWITCH DEV CLIENT SECRET>` - Go to https://dev.twitch.tv/ to register this application and gain the client secret
- `<STREAM ELEMENTS TOKEN>` - Your Stream Elements JWT token (note: token may expire after a while)
- `<MAX POINTS GIVEN PER REQUEST>` - The max points that is granted to a user when they qualify
- `<TIME IN BETWEEN MESSAGES>` - The time between messages before a user qualifies again

## Authors

  - **Namanh Tran** - *Creator* -
    [Namanh Tran](https://github.com/NamanhTran)

## License

This project is licensed under the [MIT License](LICENSE.md) 
see the [LICENSE.md](LICENSE.md) file for
details
