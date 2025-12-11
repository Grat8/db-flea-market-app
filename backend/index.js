const express = require('express');
const mysql = require('mysql2/promise'); // use promise-based API
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(bodyParser.json());

// MySQL Connection using env variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_NAME || 'db',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true
};

let db;
// Async IIFE to connect and seed DB
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL');

    // Automatically run all SQL seed files
    const seedDir = path.join(__dirname, 'sql/seed');
    if (fs.existsSync(seedDir)) {
      const files = fs.readdirSync(seedDir).sort(); // ensures order
      for (const file of files) {
        if (file.endsWith('.sql')) {
          const sql = fs.readFileSync(path.join(seedDir, file), 'utf8');
          await db.query(sql);
          console.log(`Executed seed file: ${file}`);
        }
      }
      console.log('All seed files executed');
    }

    // Example: ensure vendor_auth table exists (optional, can remove if included in seeds)
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
    await db.query(createVendorAuthSql);
    console.log('Ensured vendor_auth table exists');

    // Make db connection globally accessible if needed
    app.locals.db = db;

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error connecting to MySQL or running seeds:', err);
    process.exit(1); // stop server if DB fails
  }
})();

// TESTING: debug
async function debugTables() {
  try {
    const [dbName] = await db.query('SELECT DATABASE() AS currentDB');
    console.log('Connected to database:', dbName[0].currentDB);

    const [tables] = await db.query('SHOW TABLES');
    console.log('Tables in current database:');
    tables.forEach(row => console.log(row));
  } catch (err) {
    console.error('SQL debug error:', err);
  }
}

debugTables();


const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/dashboard', dashboardRoutes(db));
// Routes
var routes = express.Router();
app.use('/api', routes);

routes.get('/', async (req, res) => {
  res.send('Welcome to the DB Market API');
});

routes.get('/vendor', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM vendor');
    res.json(results);
  } catch (err) {
    console.error('Error fetching vendors:', err);
    res.status(500).send('Error fetching vendors');
  }
});

routes.get('/vendor/:vid', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM vendor WHERE id = ?', [req.params.vid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching vendor:', err);
    res.status(500).send('Error fetching vendor');
  }
});

routes.put('/vendor/:vid', async (req, res) => {
  const vid = req.params.vid;
  const { name, phone, email, description, owner, logo } = req.body;

  if (!name) return res.status(400).json({ error: 'name is required' });

  try {
    const [result] = await db.query(
      'UPDATE vendor SET name = ?, phone = ?, email = ?, description = ?, owner = ?, logo = ? WHERE id = ?',
      [name, phone || '', email || '', description || '', owner || '', logo || null, vid]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    const [rows] = await db.query('SELECT * FROM vendor WHERE id = ?', [vid]);
    return res.json({ message: 'Vendor updated', vendor: rows[0] });
  } catch (err) {
    console.error('Error updating vendor:', err);
    res.status(500).json({ error: 'Error updating vendor' });
  }
});

routes.delete('/vendor/:vid', async (req, res) => {
  const vid = req.params.vid;
  try {
    await db.query('DELETE FROM vendor_auth WHERE vendor_id = ?', [vid]);
    const [result] = await db.query('DELETE FROM vendor WHERE id = ?', [vid]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Vendor not found' });

    res.json({ message: 'Vendor account deleted' });
  } catch (err) {
    console.error('Error deleting vendor:', err);
    res.status(500).json({ error: 'Error deleting vendor account' });
  }
});

routes.get('/vendor/:vid/product', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM product WHERE vid = ?', [req.params.vid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

routes.post('/vendor/:vid/product', async (req, res) => {
  const vid = req.params.vid;
  const { name, description, count, price } = req.body;

  if (!name) return res.status(400).json({ error: 'name is required' });

  try {
    const [result] = await db.query(
      'INSERT INTO product (name, description, count, price, vid) VALUES (?, ?, ?, ?, ?)',
      [name, description || '', count || 0, price || 0, vid]
    );
    const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [result.insertId]);
    res.status(201).json({ message: 'Product created', product: rows[0] });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Error creating product' });
  }
});

routes.put('/product/:pid', async (req, res) => {
  const pid = req.params.pid;
  const { name, description, count, price } = req.body;

  if (!name) return res.status(400).json({ error: 'name is required' });

  try {
    const [result] = await db.query(
      'UPDATE product SET name = ?, description = ?, count = ?, price = ? WHERE id = ?',
      [name, description || '', count || 0, price || 0, pid]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });

    const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [pid]);
    res.json({ message: 'Product updated', product: rows[0] });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Error updating product' });
  }
});

routes.delete('/product/:pid', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM product WHERE id = ?', [req.params.pid]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

routes.get('/vendor/:vid/sale', async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT DISTINCT s.* 
       FROM sale s 
       JOIN saleitem si ON si.sid = s.id 
       JOIN product p ON si.pid = p.id 
       WHERE p.vid = ?`,
      [req.params.vid]
    );
    res.json(results);
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).send('Error fetching sales');
  }
});

// --- Sale endpoints ---
routes.get('/sale/:sid', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM sale WHERE id = ?', [req.params.sid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching sale:', err);
    res.status(500).send('Error fetching sale');
  }
});

routes.get('/sale/:sid/item', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM saleitem WHERE sid = ?', [req.params.sid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching sale items:', err);
    res.status(500).send('Error fetching sale items');
  }
});

routes.get('/sale/:sid/product', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM saleitem si JOIN product p ON si.pid = p.id WHERE si.sid = ?',
      [req.params.sid]
    );
    res.json(results);
  } catch (err) {
    console.error('Error fetching sale products:', err);
    res.status(500).send('Error fetching sale products');
  }
});

routes.get('/sale/:sid/vendor', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT DISTINCT v.* FROM saleitem si JOIN product p ON si.pid = p.id JOIN vendor v ON p.vid = v.id WHERE si.sid = ?',
      [req.params.sid]
    );
    res.json(results);
  } catch (err) {
    console.error('Error fetching sale vendors:', err);
    res.status(500).send('Error fetching sale vendors');
  }
});

// --- Product endpoints ---
routes.get('/product/:pid', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM product WHERE id = ?', [req.params.pid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Error fetching product');
  }
});

routes.get('/product/:pid/item', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM saleitem WHERE pid = ?', [req.params.pid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching sale items for product:', err);
    res.status(500).send('Error fetching sale items');
  }
});

// --- Vendor registration/login/forgot-password ---
routes.post('/vendor/register', async (req, res) => {
  const { name, phone, email, description, owner, password, logo } = req.body;

  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, and password required' });

  try {
    const [vendorResult] = await db.query(
      'INSERT INTO vendor (name, phone, email, description, owner, logo) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone || '', email || '', description || '', owner || '', logo || null]
    );
    const vendorId = vendorResult.insertId;

    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO vendor_auth (vendor_id, email, password) VALUES (?, ?, ?)', [vendorId, email, hashed]);

    const [rows] = await db.query('SELECT * FROM vendor WHERE id = ?', [vendorId]);
    res.status(201).json({ vendor: rows[0] });
  } catch (err) {
    console.error('Error registering vendor:', err);
    res.status(500).json({ error: 'Error creating vendor' });
  }
});

routes.post('/vendor/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const [results] = await db.query('SELECT * FROM vendor_auth WHERE email = ?', [email]);
    if (!results || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const auth = results[0];
    const match = await bcrypt.compare(password, auth.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const [vrows] = await db.query('SELECT * FROM vendor WHERE id = ?', [auth.vendor_id]);
    const vendor = vrows[0];
    res.json({ vendor_id: vendor?.id, vendor });
  } catch (err) {
    console.error('Error logging in vendor:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

routes.post('/vendor/forgot-password', async (req, res) => {
  const { email, phone, owner, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: 'email and newPassword required' });

  try {
    const [vendors] = await db.query('SELECT * FROM vendor WHERE email = ? AND phone = ? AND owner = ?', [email, phone || '', owner || '']);
    if (!vendors || vendors.length === 0) return res.status(404).json({ error: 'Vendor not found or details do not match' });

    const vendor = vendors[0];
    const hashed = await bcrypt.hash(newPassword, 10);

    const [authRows] = await db.query('SELECT * FROM vendor_auth WHERE vendor_id = ?', [vendor.id]);
    if (authRows && authRows.length > 0) {
      await db.query('UPDATE vendor_auth SET password = ? WHERE vendor_id = ?', [hashed, vendor.id]);
      res.json({ message: 'Password updated' });
    } else {
      await db.query('INSERT INTO vendor_auth (vendor_id, email, password) VALUES (?, ?, ?)', [vendor.id, email, hashed]);
      res.json({ message: 'Password set' });
    }
  } catch (err) {
    console.error('Error in forgot-password:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Paginated products ---
routes.get('/product', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const search = `%${req.query.search || ''}%`;

    // Get total count
    const [countResults] = await db.query('SELECT COUNT(*) AS total FROM product WHERE name LIKE ?', [search]);
    const total = countResults[0]?.total || 0;

    // Get paginated rows
    const [results] = await db.query('SELECT * FROM product WHERE name LIKE ? LIMIT ? OFFSET ?', [search, limit, offset]);

    res.json({ products: results, total });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// --- Sale items for a product ---
routes.get('/product/:pid/item', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM saleitem WHERE pid = ?', [req.params.pid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching sale items for product:', err);
    res.status(500).send('Error fetching sale items');
  }
});

// --- Booths ---
routes.get('/booth', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM booth');
    res.json(results);
  } catch (err) {
    console.error('Error fetching booths:', err);
    res.status(500).send('Error fetching booths');
  }
});

routes.get('/booth/:bid', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM booth WHERE id = ?', [req.params.bid]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching booth:', err);
    res.status(500).send('Error fetching booth');
  }
});

// --- Reservations for a booth (optional day filter) ---
routes.get('/booth/:bid/reservation', async (req, res) => {
  try {
    const bid = req.params.bid;
    const day = req.query.day;

    let query = 'SELECT * FROM reservation WHERE bid = ?';
    const params = [bid];
    if (day) {
      query += ' AND DATE(date) = ?';
      params.push(day);
    }

    const [results] = await db.query(query, params);
    res.json(results);
  } catch (err) {
    console.error('Error fetching booth reservations:', err);
    res.status(500).send('Error fetching reservations');
  }
});

// --- All reservations ---
routes.get('/reservation', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM reservation');
    res.json(results);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).send('Error fetching reservations');
  }
});

// --- Create reservation ---
routes.post('/reservation', async (req, res) => {
  try {
    const { vid, bid, date, duration } = req.body;
    if (!vid || !bid || !date || !duration) {
      return res.status(400).send('Missing required reservation fields');
    }

    const [results] = await db.query(
      'INSERT INTO reservation (vid, bid, date, duration) VALUES (?, ?, ?, ?)',
      [vid, bid, date, duration]
    );

    res.status(201).json({ message: 'Reservation created successfully', id: results.insertId });
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).send('Error creating reservation');
  }
});

// --- Get booth reservations for a specific day ---
routes.get('/reservations', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).send('Missing date parameter');

    const [results] = await db.query(
      `SELECT r.id, r.bid, r.vid, r.date, r.duration, v.name AS vendor_name
       FROM reservation r
       JOIN vendor v ON r.vid = v.id
       WHERE DATE(r.date) = ?
       ORDER BY r.bid, r.date`,
      [date]
    );

    res.json(results);
  } catch (err) {
    console.error('Error fetching reservations for day:', err);
    res.status(500).send('Error fetching reservations');
  }
});

// --- Get latest booth reservation for a vendor ---
routes.get('/vendor/:vid/booth', async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT b.*, r.date AS reservationDate, r.duration
       FROM booth b
       JOIN reservation r ON r.bid = b.id
       WHERE r.vid = ?
       ORDER BY r.date DESC
       LIMIT 1`,
      [req.params.vid]
    );

    res.json(results);
  } catch (err) {
    console.error('Error fetching vendor booth reservation:', err);
    res.status(500).send('Error fetching booth');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});