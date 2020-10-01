const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const itemController = require("../controllers/items")

storage = multer.diskStorage({
    destination: './storage/videos',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

// Create

router.post("/create",multer({storage: storage,fileFilter:fileFilter}).single('image'),itemController.create)
router.get("/read",itemController.read)

module.exports = router