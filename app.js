/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const cloudinary = require('cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const db = require('./src/dbs/index');
const Helper = require('./src/controllers/helper');
const Users = require('./src/controllers/users');
const authUsers = require('./src/controllers/authUsers');
const Recipe = require('./src/controllers/recipe');
const Gifs = require('./src/controllers/gifs');
const authUsersSignIn = require('./src/controllers/authSignIn');
const Feeds = require('./src/controllers/feeds');
const Ingredients = require('./src/controllers/ingredients');
const Step = require('./src/controllers/procedure');



const Auth = require('./src/middlewares/auth');


const app = express();
app.use(cors());

http.createServer(app);
dotenv.config();

// HANDLING CORS ERRORS
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
  distination: function (req, file, cb) {
    cb(null, './src');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('image is not gif'), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
});

// app.use('/api/v1/articles', Articles);
app.post('/api/v1/recipe', Auth.verifyToken, async (req, res) => {
  Recipe.postRecipe(req, res);
});
app.get('/api/v1/recipe', Auth.verifyToken, async (req, res) => {
  Recipe.getAll(req, res);
});
app.get('/api/v1/myrecipe', Auth.verifyToken, async (req, res) => {
  Recipe.getMyRecipe(req, res);
});

app.get('/api/v1/recipe/:id', Auth.verifyToken, async (req, res) => {
  Recipe.getOne(req, res);
});
app.post('/api/v1/recipe/:id/comment', Auth.verifyToken, async (req, res) => {
  Recipe.postComment(req, res);
});
app.put('/api/v1/recipe/:id', Auth.verifyToken, async (req, res) => {
  Recipe.updateArticle(req, res);
});
app.delete('/api/v1/recipe/:id', Auth.verifyToken, async (req, res) => {
  Recipe.deleteArticle(req, res);
});

app.post('/api/v1/ingredients', Auth.verifyToken, async (req, res) => {
  Ingredients.postIngredient(req, res);
});
app.get('/api/v1/ingredients/:id', Auth.verifyToken, async (req, res) => {
  Ingredients.getAll(req, res);
});
app.put('/api/v1/ingredients/:id', Auth.verifyToken, async (req, res) => {
  Ingredients.updateIngredients(req, res);
});
app.delete('/api/v1/ingredients/:id', Auth.verifyToken, async (req, res) => {
  Ingredients.deleteIngredient(req, res);
});

app.post('/api/v1/step', Auth.verifyToken, async (req, res) => {
  Step.postSteps(req, res);
});
app.get('/api/v1/steps/:id', Auth.verifyToken, async (req, res) => {
  Step.getAll(req, res);
});
app.put('/api/v1/step/:id', Auth.verifyToken, async (req, res) => {
  Step.updateStep(req, res);
});
app.delete('/api/v1/step/:id', Auth.verifyToken, async (req, res) => {
  Step.deleteStep(req, res);
});


app.use('/api/v1/users', Auth.verifyToken, Users);
app.use('/api/v1/auth/create-user', authUsers);
app.use('/api/v1/auth/signin', authUsersSignIn);

app.post('/api/v1/gifs/:id/comment', Auth.verifyToken, async (req, res) => {
  Gifs.postGifComment(req, res);
});
app.get('/api/v1/gifs', Auth.verifyToken, async (req, res) => {
  Gifs.getGif(req, res);
});
app.get('/api/v1/gifs/:id', Auth.verifyToken, async (req, res) => {
  Gifs.getOne(req, res);
});
app.delete('/api/v1/gifs/:id', Auth.verifyToken, async (req, res) => {
  Gifs.deleteGif(req, res);
});
app.get('/', (req, res) => {
  res.json({
    wellcome: 'welcome to raycipee',
    dd: 'ggfd',
  });
});

app.post('/api/v1/gifs', upload.single('image'), Auth.verifyToken, (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (result) {
    // console.log(req.file);
    Gifs.createGif(req, res, result.secure_url);
  });
});

app.get('/api/v1/checktoken', Auth.verifyToken, (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
});
app.get('/api/v1/checkrole', Auth.verifyAdmin, (req, res) => {
  res.status(200).send({status: 'ok'});
});
app.get('/api/v1/feeds', Auth.verifyToken, async (req, res) => {
  Feeds.getAll(req, res);
});


module.exports = app;
