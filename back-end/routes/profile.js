const express = require('express')
const router = express.Router()
const axios = require("axios")
const multer = require("multer") 
const path = require("path")

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

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we ca create a new one based on it
    const extension = path.extname(file.originalname)
    const basenameWithoutExtension = path.basename(file.originalname, extension)
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
    // tell multer to use this new filename for the uploaded file
    cb(null, newName)
  },
})
const upload = multer({ storage: storage })

// route for HTTP POST requests for /upload-example
router.post("/", upload.single("profile_pic"), (req, res, next) => {
  // check whether anything was uploaded
  if (!req.files || req.files.length == 0) {
    // failure!
    const error = new Error("Please upload a picture!")
    error.httpStatusCode = 400
    res.json({
      status: "you fail!!!",
      message: "rejected your file... try harder",
    })
    // return next(error)
  }else {
    // success
    // send a message back to the client, for example, a simple JSON object
    const data = {
      status: "all good",
      message: "file was uploaded!!!",
      files: req.files,
    }
    res.json(data)
  }
})


module.exports = router