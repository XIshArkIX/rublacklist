const fs = require('fs');
const https = require('https');

// Calculate date
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month < 10) {
  month = '0' + month;
}

// Worker
try {
  const database = require('./res.json');
  database[Object.keys(database).toString()].forEach(data => {
    if (data.ip.length > 1) {
      data.ip.forEach(data2 => {
        fs.appendFileSync("ip.txt", `${data2}\n`);
      });
    } else {
      fs.appendFileSync("ip.txt", `${data.ip.toString()}\n`);
    }
  });
  console.log(`Current date: ${year}\-${month}\-${day}`);
  console.log(`Database created date: ${Object.keys(database).toString()}`);
} catch (e) {
  https.get('https://api.reserve-rbl.ru/api/v2/current/json', (res) => {
    console.log(`statuscode: ${res.statusCode}`);
    let database = '';
    res.on('data', (d) => {
      database += d;
    });
    res.on('end', () => {
      database = JSON.parse(database);
      database[Object.keys(database).toString()].forEach(data => {
        if (data.ip.length > 1) {
          data.ip.forEach(data2 => {
            fs.appendFileSync("ip.txt", `${data2}\n`);
          });
        } else {
          fs.appendFileSync("ip.txt", `${data.ip.toString()}\n`);
        }
      });
      console.log(`Current time: ${year}\-${month}\-${day}`);
      console.log(`Database created time: ${Object.keys(database).toString()}`);
    });
  });
}
