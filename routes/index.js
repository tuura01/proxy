const express = require('express');
const router = express.Router();
const axios = require('axios');
const apicache = require('apicache');

const API_KEY = process.env.API_KEY;

let cache = apicache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {

    const {playlistId} = req.query;
    let nextPageToken = null;
    let allVideosInPlaylist = [];
  
    do {
      try {
        const apiUrl = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${API_KEY}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`);
        const playlistItems = apiUrl.data.items;
        nextPageToken = apiUrl.data.nextPageToken;
        if (playlistItems) {
          allVideosInPlaylist = [...allVideosInPlaylist, ...playlistItems];
        } else {
          console.error("No videos in playlist");
        }
      } catch (error) {
        console.error(error);
      }
  
    } while (nextPageToken);
  
    res.json(allVideosInPlaylist);
  });

module.exports = router;