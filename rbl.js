const url = require('./res.json');
const fs = require('fs');

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
if (month < 10) {
  month = '0' + month;
}

try {
  url[Object.keys(url).toString()].forEach(data => {
    if (data.ip.length > 1) {
      data.ip.forEach(data2 => {
        fs.appendFileSync("ip.txt", `${data2}\n`);
        // console.log(data2);
      });
    } else {
      // console.log(data.ip.toString());
      fs.appendFileSync("ip.txt", `${data.ip.toString()}\n`);
    }
  });
  console.log("Success!");
} catch (e) {
  console.error(e);
} finally {
  console.log(`Current time: ${year}\-${month}\-${day}`);
  console.log(`Database created time: ${Object.keys(url).toString()}`);
}
