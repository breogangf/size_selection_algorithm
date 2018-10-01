const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const router = express.Router();
const logger = require('./helpers/logger');

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
// 'useFindAndModify': true by default. 
// Set to false to make findOneAndUpdate() use native findOneAndUpdate() rather than findAndModify()

const app = express();
const port = process.env.PORT || 3000;

module.exports = app;

// Connection to DB
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/size_selection_algorithm',
  { useNewUrlParser: true, autoIndex: false },
  (err) => {
    if (err) throw err;
  });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import controllers
const SizeCtrl = require('./controllers/size');

app.use(router);

// API routes
router.route('/sizes')
  .get(SizeCtrl.getSizes);

app.use('/', router);

// Start server
app.listen(port, () => {
  logger.log(`Node server running on port ${port}`);
});
