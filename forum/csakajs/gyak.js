/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {number} birthdate
 */

const fs = require("fs");
const { parse } = require("path");
fs.readFile("csv.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  createArrayFromCsv(data, 2);
  input(createArrayFromCsv(data), data);
});

function createArrayFromCsv(data) {
  const result = [];
  const lines = data.split("\n");
  const headers = lines[0].split(";");

  lines.map((l) => {
    const obj = {};
    const line = l.split(";");

    headers.map((h, i) => {
      obj[h] = line[i];
    });

    result.push(obj);
  });
  result.shift();
  return result;
}

const readline = require("readline");
/**Create readline */
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
      console.log("average age:" + getAllAge(result));
    } else if (number === 3) {
      const name = await getAnswer("First name?: ");
      console.log(getAgeFromName(result, name));
    } else if (number === 4) {
      console.table(result);
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

function getAllAge(array) {
  let birthday = array.map((e) => e.birthdate);
  let average = birthday.map((e) => getAge(e));
  return getAverage(average);
}

function getAgeFromName(users, firstName) {
  let birthdays = users
    .filter((user) => user.first_name === firstName)
    .map((user) => user.birthdate);
  if (birthdays.length > 0) {
    return getAllAge(birthdays);
  } else {
    return "Person is not found";
  }
}
function getAge(date) {
  let birthdate = (+new Date(date) / 1000) | 0;
  let today = (+new Date() / 1000) | 0;
  let age = ((today - birthdate) / 60 / 60 / 24 / 365) | 0;
  return age;
}

function getAverage(numbers) {
  let sum = 0;
  let divisor = 0;
  numbers.forEach((e) => {
    sum = sum + e;
    ++divisor;
  });
  sum = sum / divisor;
  return sum;
}

/**Add member */
function editCsv(fname, lname, mail, birthdate, csvToArray) {
  const fs = require("fs");
  const content =
    "\n" +
    getNextId(csvToArray) +
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

function getNextId(csvToArray) {
  let x = 0;
  csvToArray.forEach((e) => {
    if (e.id > x) {
      x = e.id;
    }
  });
  x = parseInt(x) + 1;
  return x;
}
