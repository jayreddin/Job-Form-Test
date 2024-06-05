const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Serve static files

app.post('/upload', upload.array('images', 10), (req, res) => { // '10' is the max number of files
  res.send('Images uploaded!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
