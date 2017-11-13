let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// API file for interacting with MongoDB
const api = require('./routes/api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to Mangoose
mongoose.connect('mongodb://127.0.0.1:27017/user_db', {
  useMongoClient: true,
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connection open");
});

//Route
//Angular client folder
app.use(express.static(__dirname+'/client/dist'));

//Defined API
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/dist/index.html');
});

app.listen(3000, () => console.log(`Running on localhost:3000`));