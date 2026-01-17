const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

// Initialize DB file
const dbPath = path.resolve(__dirname, 'zaidan.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + dbPath + ': ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create Tables
const initDb = () => {
  db.serialize(() => {
    // 1. Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    // 2. Customers Table
    db.run(`CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      balance REAL DEFAULT 0
    )`);

    // 3. Invoices Table
    db.run(`CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      machine_type TEXT,
      amount REAL,
      date TEXT,
      details TEXT,
      FOREIGN KEY(customer_id) REFERENCES customers(id)
    )`);

    // 4. Accounting Table
    db.run(`CREATE TABLE IF NOT EXISTS accounting (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT, -- 'income' or 'expense'
      amount REAL,
      description TEXT,
      date TEXT,
      timestamp INTEGER
    )`);

    // Seed Admin User (If not exists)
    // Email: EyadZidan110099@admin.com
    // Password: adminadmin990011@user.com
    const adminEmail = "EyadZidan110099@admin.com";
    const adminPass = "adminadmin990011@user.com";

    db.get("SELECT * FROM users WHERE email = ?", [adminEmail], (err, row) => {
      if (!row) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(adminPass, salt);
        const stmt = db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
        stmt.run(adminEmail, hash, 'admin');
        stmt.finalize();
        console.log("Admin account created.");
      }
    });
  });
};

initDb();

module.exports = db;