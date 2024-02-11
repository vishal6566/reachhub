// fetchAndSavePlayersData.js

const axios = require('axios');
const Player = require('../model/playersModel');

async function fetchAndSavePlayersData() {
  try {
    // Drop the players collection before fetching new data
    await Player.collection.drop();

    // Fetch data from the URL
    const response = await axios.get('https://lichess.org/api/player/top/50/classical');
    const playersData = response.data;

    // Save each player data to MongoDB
    for (const playerData of playersData.users) {
      await Player.create({
        id: playerData.id,
        username: playerData.username,
        perfs: playerData.perfs,
        title: playerData.title,
        patron: playerData.patron || false,
        online: playerData.online || false
      });
    }

    console.log('Players data saved to MongoDB successfully');

    // Fetch saved players data
    const savedPlayers = await Player.find();
    return savedPlayers;
  } catch (error) {
    console.error('Error fetching or saving players data:', error.message);
    throw error; // Rethrow the error to handle it where the function is called
  }
}


const topPlayers= async (req, res) => {
    try {
     let x= await fetchAndSavePlayersData();
      res.status(200).send(x);
    } catch (error) {
      console.error('Error fetching or saving players data:', error.message);
      res.status(500).send('Error fetching or saving players data');
    }
  };


module.exports = {fetchAndSavePlayersData,topPlayers};
