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
const array2 = [1, 2, 5];
let x = 0;
let common = [];
function commonElement(array1, array2) {
  if (array1.length > array2.length) {
    for (i of array1) {
      for (j of array2) {
        if (i === j) {
          for (k of common) {
            if (k != i) {
              common.push(i);
              ++x;
            }
          }
        }
      }
    }
  }

  return x;
}

console.log(commonElement(array1, array2));
