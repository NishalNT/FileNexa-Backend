const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');
const cors = require('cors');

// Define storage strategy for multer
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 500 }, // 500 MB
}).single('myfile');

// CORS options
const corsOptions = {
  origin: 'https://filenexa.vercel.app',
  credentials: true,
};

router.post('/', cors(corsOptions), (req, res) => {
  upload(req, res, async (err) => {
    if (!req.file) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    try {
      const response = await file.save();
      return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    } catch (saveErr) {
      return res.status(500).json({ error: saveErr.message });
    }
  });
});

router.post('/send', cors(corsOptions), async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).json({ error: 'All fields are required.' });
  }

  try {
    const file = await File.findOne({ uuid });
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }
    if (file.sender) {
      return res.status(422).json({ error: 'Email already sent.' });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    await file.save();

    const sendMail = require('../services/emailService');
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: 'FileNexa',
      text: `${emailFrom} shared a file with you.`,
      html: require('../services/emailTemplate')({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size: `${Math.round(file.size / 1024)} KB`,
        expires: '24 hours',
      }),
    });

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
