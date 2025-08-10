const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure upload directories exist
['uploads/pdfs', 'uploads/samples', 'uploads/images', 'data'].forEach(dir => {
  const full = path.join(__dirname, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads';
    if (file.fieldname === 'pdf') folder = 'uploads/pdfs';
    else if (file.fieldname === 'samplePdf') folder = 'uploads/samples';
    else if (file.fieldname === 'image') folder = 'uploads/images';
    cb(null, path.join(__dirname, folder));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the project root
app.use(express.static(path.join(__dirname)));

// Admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.post('/admin/subject', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'samplePdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'subjects.json');
  let subjects = [];
  if (fs.existsSync(dataPath)) {
    subjects = JSON.parse(fs.readFileSync(dataPath));
  }
  const record = {
    name: req.body.subject,
    pdf: req.files['pdf'] ? '/' + path.relative(__dirname, req.files['pdf'][0].path).replace(/\\/g, '/') : '',
    samplePdf: req.files['samplePdf'] ? '/' + path.relative(__dirname, req.files['samplePdf'][0].path).replace(/\\/g, '/') : '',
    image: req.files['image'] ? '/' + path.relative(__dirname, req.files['image'][0].path).replace(/\\/g, '/') : ''
  };
  subjects.push(record);
  fs.writeFileSync(dataPath, JSON.stringify(subjects, null, 2));
  res.redirect('/admin');
});

// API to fetch subjects
app.get('/subjects', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'subjects.json');
  let subjects = [];
  if (fs.existsSync(dataPath)) {
    subjects = JSON.parse(fs.readFileSync(dataPath));
  }
  res.json(subjects);
});

// Default route serves the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
