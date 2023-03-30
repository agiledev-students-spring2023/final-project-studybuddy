const express = require("express");
const router = express.Router();
const { userLoginSchema } = require("../validators/user.validator");
const { validate } = require("../middlewares/validator.middleware");
const { loginController } = require("../controllers/user.controller");

router.post("/login", validate(userLoginSchema), loginController);

router.get('/', (req, res) => {
    const url = 'https://my.api.mockaroo.com/posts.json';
    const key = 'fb86de30';
  
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


module.exports = router;
