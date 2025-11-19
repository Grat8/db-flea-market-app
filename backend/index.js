const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
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

routes.get('/vendor/:vid/product', (req, res) => {
  db.query(`SELECT * FROM product where vid = ${req.params["vid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);
  });
});

routes.get('/vendor/:vid/sale', (req, res) => {
  db.query(`SELECT DISTINCT s.* FROM sale s JOIN saleitem si ON si.sid = s.id JOIN product p ON si.pid = p.id where p.vid = ${req.params["vid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching sales');
      return;
    }
    res.json(results);
  });
});

routes.get('/sale/:sid', (req, res) => {
  db.query(`SELECT * FROM sale s where id = ${req.params["sid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching sales');
      return;
    }
    res.json(results);
  });
});

routes.get('/sale/:sid/item', (req, res) => {
  db.query(`SELECT * FROM saleitem where sid = ${req.params["sid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching saleitems');
      return;
    }
    res.json(results);
  });
});

routes.get('/sale/:sid/product', (req, res) => {
  db.query(`SELECT * FROM saleitem si JOIN product p ON si.pid = p.id where si.sid = ${req.params["sid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching saleitems');
      return;
    }
    res.json(results);
  });
});

routes.get('/sale/:sid/vendor', (req, res) => {
  db.query(`SELECT DISTINCT v.* FROM saleitem si JOIN product p ON si.pid = p.id JOIN vendor v ON p.vid = v.id where si.sid = ${req.params["sid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching vendors');
      return;
    }
    res.json(results);
  });
});

routes.get('/product/:pid', (req, res) => {
  db.query(`SELECT * FROM product where id = ${req.params["pid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);
  });
});

routes.get('/product/:pid/item', (req, res) => {
  db.query(`SELECT * FROM saleitem where pid = ${req.params["pid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching saleitems');
      return;
    }
    res.json(results);
  });
});

routes.get('/booth', (req, res) => {
  db.query(`SELECT * FROM booth`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching booths');
      return;
    }
    res.json(results);
  });
});

routes.get('/booth/:bid', (req, res) => {
  db.query(`SELECT * FROM booth where id = ${req.params["bid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching booths');
      return;
    }
    res.json(results);
  });
});

routes.get('/booth/:bid/reservation', (req, res) => {
  db.query(`SELECT * FROM reservation where bid = ${req.params["bid"]}`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching reservations');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});