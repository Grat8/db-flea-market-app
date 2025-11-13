const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

// Routes
var routes = express.Router();
app.use('/api', routes);

routes.get('/', (req, res) => {
  res.send('Welcome to the DB Market API');
});

routes.get('/vendor', (req, res) => {
  db.query(`SELECT * FROM vendor`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching vendors');
      return;
    }
    res.json(results);
  });
});

routes.get('/vendor/:vid', (req, res) => {
  db.query(`SELECT * FROM vendor where id = ${req.params["vid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching vendors');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});