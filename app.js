let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route
//Defined API
app.use('/api', require('./routes/api'));

//Connect to Mangoose
mongoose.connect('mongodb://127.0.0.1:27017/user_db', {
  useMongoClient: true,
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connection open");
});

app.listen(3000);
console.log('Running on port 3000...');