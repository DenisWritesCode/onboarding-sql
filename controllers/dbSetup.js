const mysql = require('mysql');

// Establish connection with database
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'denis',
    password : 'denis',
    database : 'onboarding'
  });

// Connect to MySQL
db.connect(err => {
    if(err) throw err;
    console.log("Connection with MySQL established...");
});

module.exports = db;