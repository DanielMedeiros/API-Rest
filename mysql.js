const mysql = require('mysql');

// local
// var poll = mysql.createPool({
//     "user" : "root",
//     "password" : "root@123",
//     "database" : "vendas",
//     "host" : "localhost",
//     "port" : 3306
// });

/* em PROD */
var pool = mysql.createPool({
    "user" : process.env.MYSQL_USER,
    "password" : process.env.MYSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    "host" : process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT
});


exports.pool = pool;