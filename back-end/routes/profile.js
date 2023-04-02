const express = require('express')
const router = express.Router()
const axios = require("axios")

router.get('/', (req, res) => {
    const url = 'https://my.api.mockaroo.com/study_buddy_data.json';
    const key = 'a015ead0';
  
    axios.get(url, {
      params: { key },
      headers: {
        cookie: 'layer0_bucket=90; layer0_destination=default; layer0_environment_id_info=1680b086-a116-4dc7-a17d-9e6fdbb9f6d9'
      }
    })
    .then(response => {
      const data = response.data;
      res.json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error retrieving data from mockAPI');
    });
})

module.exports = router