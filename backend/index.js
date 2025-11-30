const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
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
  // Ensure vendor_auth table exists (create if missing)
  const createVendorAuthSql = `
    CREATE TABLE IF NOT EXISTS vendor_auth (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vendor_id INT NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (vendor_id) REFERENCES vendor(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(createVendorAuthSql, (createErr) => {
    if (createErr) {
      console.error('Error creating vendor_auth table (if missing):', createErr);
    } else {
      console.log('Ensured vendor_auth table exists');
    }
  });
});

const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/dashboard', dashboardRoutes(db));
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

// Vendor registration: create vendor row and vendor_auth (hashed password)
routes.post('/vendor/register', (req, res) => {
  const { name, phone, email, description, owner, password, logo } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  // Insert vendor first
  const vendorInsertSql = 'INSERT INTO vendor (name, phone, email, description, owner, logo) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(vendorInsertSql, [name, phone || '', email || '', description || '', owner || '', logo || null], (err, result) => {
    if (err) {
      console.error('Error inserting vendor:', err);
      return res.status(500).json({ error: 'Error creating vendor' });
    }

    const vendorId = result.insertId;

    // Hash the password and insert into vendor_auth
    bcrypt.hash(password, 10, (hashErr, hashed) => {
      if (hashErr) {
        console.error('Error hashing password:', hashErr);
        // attempt to rollback vendor insert
        db.query('DELETE FROM vendor WHERE id = ?', [vendorId], () => {
          return res.status(500).json({ error: 'Error creating vendor auth' });
        });
        return;
      }

      const authInsertSql = 'INSERT INTO vendor_auth (vendor_id, email, password) VALUES (?, ?, ?)';
      db.query(authInsertSql, [vendorId, email, hashed], (authErr) => {
        if (authErr) {
          console.error('Error inserting vendor_auth:', authErr);
          // rollback vendor insert
          db.query('DELETE FROM vendor WHERE id = ?', [vendorId], () => {
            return res.status(500).json({ error: 'Error creating vendor auth' });
          });
          return;
        }

        // Return created vendor (without password)
        db.query('SELECT * FROM vendor WHERE id = ?', [vendorId], (fetchErr, rows) => {
          if (fetchErr) {
            console.error('Error fetching created vendor:', fetchErr);
            return res.status(201).json({ message: 'Vendor created' });
          }
          return res.status(201).json({ vendor: rows[0] });
        });
      });
    });
  });
});

// Vendor login: authenticate using vendor_auth table
routes.post('/vendor/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  db.query('SELECT * FROM vendor_auth WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying vendor_auth:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const auth = results[0];
    bcrypt.compare(password, auth.password, (cmpErr, match) => {
      if (cmpErr) {
        console.error('Error comparing password:', cmpErr);
        return res.status(500).json({ error: 'Server error' });
      }

      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      // fetch vendor info
      db.query('SELECT * FROM vendor WHERE id = ?', [auth.vendor_id], (vErr, vrows) => {
        if (vErr) {
          console.error('Error fetching vendor for login:', vErr);
          return res.status(500).json({ error: 'Server error' });
        }

        const vendor = vrows && vrows[0];
        // return vendor info (no password). Include vendor_id for compatibility with frontend
        return res.json({ vendor_id: vendor?.id, vendor });
      });
    });
  });
});

// GET /api/product - return paginated products and total count
routes.get('/product', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;

  // first get total count
  db.query('SELECT COUNT(*) AS total FROM product', (err, countResults) => {
    if (err) {
      console.error('Error executing count query: ' + err.stack);
      res.status(500).send('Error fetching products');
      return;
    }

    const total = countResults && countResults[0] ? countResults[0].total : 0;

    // then fetch the paginated rows
    db.query('SELECT * FROM product LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) {
        console.error('Error executing paginated query: ' + err.stack);
        res.status(500).send('Error fetching products');
        return;
      }

      res.json({ products: results, total });
    });
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

routes.get('/reservation', (req, res) => {
  db.query(`SELECT * FROM reservation`, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching reservations');
      return;
    }
    res.json(results);
  });
});

routes.post('/reservation', (req, res) => {
  const { vid, bid, date, duration } = req.body;

  if (!vid || !bid || !date || !duration) {
    res.status(400).send('Missing required reservation fields');
    return;
  }

  const query = `INSERT INTO reservation (vid, bid, date, duration) VALUES (?, ?, ?, ?)`;

  db.query(query, [vid, bid, date, duration], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error creating reservation');
      return;
    }

    res.status(201).json({ message: 'Reservation created successfully', id: results.insertId });
  });
});

// Get booth reservation for a vendor
routes.get('/vendor/:vid/booth', (req, res) => {
    db.query(`
    SELECT b.*, r.date as reservationDate, r.duration 
    FROM booth b
    JOIN reservation r ON r.bid = b.id
    WHERE r.vid = ?
    ORDER BY r.date DESC
    LIMIT 1
  `, [req.params["vid"]], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching booth');
            return;
        }
        res.json(results);
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});