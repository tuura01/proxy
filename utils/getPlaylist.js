import axios from 'axios';
import {gapi} from 'gapi-script';

const getPlaylist = (summonerName) => {
  return new Promise((resolve, reject) => {
    
    gapi.client.setApiKey(process.env.API_KEY);
    gapi.client.load('youtube', 'v3');

    axios.get(`/?playlistId=PLVXKZlRWKBHg0iK2fv-Q6I9gXRJYSRQu7`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getPlaylist;
