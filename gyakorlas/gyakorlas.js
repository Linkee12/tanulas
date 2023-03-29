//1.Feladat téglalap területe

const rectangle = (a, b) => a * b;
console.log("1.Feladat:", rectangle(2, 3));

//2. Feladat 2 szám legnagyobb közös osztoja

function devisor(x, y) {
  let z = 0;
  if (x > y) {
    for (let i = 1; y >= i; ++i) {
      if ((x % i === 0) & (y % i === 0)) {
        z = i;
      }
    }
    return z;
  } else {
    for (let i = 1; x >= i; ++i) {
      if (x % i === 0 && y % i === 0) {
        z = i;
      }
    }
    return z;
  }
}
console.log("2.feladat:", devisor(360, 126));

//3.Feladat hény osztoja van 1 s zámnak

function howManyDivisor(x) {
  let z = 0;
  for (let i = 1; x >= i; i++) {
    if (x % i === 0) {
      z++;
    }
  }
  return z;
}

console.log("3.Feladat", howManyDivisor(128));

//4.feladat prím szám e

function isPrim(x) {
  if (howManyDivisor(x) === 2) {
    return console.log("4. Fealadat: Ez prim");
  } else {
    return console.log("4. Feladat: Ez nem pim");
  }
}
isPrim(7);

//5.feladat 1 adott érték hányszor szerepel 12 tömbben
let array = [1, 2, 3, 45, 6, 78, 34, 23, 1, 2, 3, 4, 2, 1, 53, 6, 5, 3];
function howManyElemInArray(array, elem) {
  let x = 0;
  for (let e of array) {
    if (elem === e) {
      x++;
    }
  }
  console.log("Ennyi elem van benne:", x);
}
howManyElemInArray(array, 2);

//6. feladat 2 tömb  közös elemeinek száma
const array1 = [1, 2, 3, 123, 5, 34, 6];
const array2 = [1, 2, 2, 2, 5];
let common = [];
function commonElement(array1, array2) {
  {
    for (let i of array1) {
      for (let j of array2) {
        if (i === j) {
          common.push(i);
        }
      }
    }
  }
  let xxxx = 0;
  for (let x of common) {
    for (let i = 0; i < common.length; ++i) {
      if (common[i] === x) {
        xxxx++;
        if (xxxx > 1) {
          common.splice(i, 1);
          xxxx = 0;
        }
      }
    }
  }
  return common.length;
}

console.log(commonElement(array1, array2));

//7 feladat 2 tömb külömbségének száma
const array3 = [1, 1, 2, 3, 5, 6, 6, 6, 78, 8, 9];
const array4 = [1, 1, 2, 3, 45, 65, 64, , 3, 7, 8];

function arrayDifference(array1, array2) {
  const first = array1.length - commonElement(array3, array4);
  const second = array2.length - commonElement(array3, array4);
  return console.log(
    "Elsö tömb elemeinek száma:",
    first,
    "Második tömb elemeinek száma:",
    second
  );
}
arrayDifference(array3, array4);

// 8 as feladat 1 tömb elemeinek átlaga
function avarage(array) {
  let x = 0;
  for (let y of array) {
    x = x + y;
  }
  x = x / array.length;
  return x;
}
console.log("Átlag:", avarage(array3));

//9 feladat hány 3 al osztahto de 5 el nem oszthato szám van

function isDivider(array) {
  let y = 0;
  for (let x of array) {
    if (x % 3 === 0 && x % 5 === 1) {
      ++y;
    } else if (x === 3) {
      ++y;
    }
  }
  return y;
}
console.log("9. Feladat", isDivider(array4));
let asd = 15 % 5;
console.log(asd);
