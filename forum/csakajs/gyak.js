/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {number} birthdate
 */

////////////////////read csv
const fs = require("fs");
const { parse } = require("path");
fs.readFile("csv.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  getArray(data, 2);
});
////////////////////get array

function getArray(data) {
  const writeableData = data;
  const result = [];
  const lines = data.split("\n");
  let headers = lines[0].split(";");

  lines.map((l) => {
    const obj = {};
    const line = l.split(";");

    headers.map((h, i) => {
      obj[h] = line[i];
    });

    result.push(obj);
  });
  result.shift();
  input(result, data);
}
////////////////////create readline
const readline = require("readline");

async function getAnswer(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const it = rl[Symbol.asyncIterator]();
  console.log(question);
  const line1 = await it.next();
  rl.close();
  return line1.value;
}
/**
 * Navigation
 * @param {User[]} result is converted csv from array
 */
async function input(result, data) {
  let isRunning = true;
  while (isRunning) {
    const number = parseInt(await getAnswer("Num: "));

    if (number === 0) {
      isRunning = false;
    } else if (number === 1) {
      console.log("Hello world!!!");
    } else if (number === 2) {
      console.log("Avarage age:" + getAllAge(result));
    } else if (number === 3) {
      const name = await getAnswer("First name?: ");
      console.log(getAgeFromName(result, name));
    } else if (number === 4) {
      console.log(createTable(result));
    } else if (number === 5) {
      const fname = await getAnswer("First name?");
      const lname = await getAnswer("Last name?");
      const mail = await getAnswer("E-mail??");
      const birthdate = await getAnswer("Birthdate: yyyy-mm-dd");
      editCsv(fname, lname, mail, birthdate, result);
    } else if (number === 6) {
      const id = await getAnswer("ID?");
      deleteMember(data, id);
    } else {
      console.log("Unknown command.");
    }
  }
}
////////////////////getage
function getAllAge(array) {
  let birthday = [];
  array.map((e) => birthday.push(e.birthdate));
  return Avarage(birthday);
}
////////////////////get age from firstname
function getAgeFromName(array, name) {
  let birthday = [];
  let help = 0;
  array.map((e) => {
    if (e.first_name === name) {
      birthday.push(e.birthdate);
      ++help;
    }
  });
  if (help != 0) {
    return Avarage(birthday);
  } else {
    return "Person is not found";
  }
}
////////////////////get varage array
function Avarage(birthday) {
  birthday = birthday.map((e) => e.split("-"));
  for (let i = 0; i < birthday.length; ++i) {
    birthday[i] = birthday[i].map((element) => parseInt(element));
  }
  let today = (+new Date() / 1000) | 0;
  let summ = 0;
  let divisor = 0;
  for (let i = 0; i < birthday.length; ++i) {
    let birthdate = +new Date(birthday[i]) / 1000;
    let age = ((today - birthdate) / 60 / 60 / 24 / 365) | 0;
    summ = summ + age;
    divisor++;
  }
  summ = summ / divisor;
  return summ;
}

////////////////////creat table from csv
function createTable(csv) {
  const table = require("console");
  console.table(csv);

  return table;
}

////////////////////ADD MEMBER
function editCsv(fname, lname, mail, birthdate, array) {
  const fs = require("fs");
  const content =
    "\n" +
    getNextId(array) +
    ";" +
    fname +
    ";" +
    lname +
    ";" +
    mail +
    ";" +
    birthdate +
    ";";
  fs.writeFile("csv.csv", content, { flag: "a" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
////////////////////DELETE MEMBER
function deleteMember(data, id) {
  const fs = require("fs");
  id = id.toString();
  let array = data.split("\n");
  array.shift();
  array.map((e, i) => {
    let x = e.slice(0, 1);
    if (id === x) {
      array.splice(i, 1);
    }
  });
  let content =
    "id;first_name;last_name;email;birthdate;" + "\n" + array.join("\n");
  fs.writeFile("csv.csv", content, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function getNextId(array) {
  let x = 0;
  array.map((e) => {
    if (e.id > x) {
      x = e.id;
    }
  });
  x = parseInt(x) + 1;
  return x;
}
