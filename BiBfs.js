var myModule = require("./main");
const { matrix, printMatrix } = require("./main");

const dirs = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
function Bisearch(matrix, N, src) {
  let queue = [];
  queue.push([src[0], src[1], `${src[0]}:${src[1]},`]);
  let visited = new Set();

  while (queue.length != 0) {
    let rp = queue.shift();
    let x = parseInt(rp[0]);
    let y = parseInt(rp[1]);
    let path = rp[2];

    if (x < 0 || x >= N || y < 0 || y >= N) continue;

    if (visited.has(`${x}:${y}`) || matrix[x][y] === 3) continue;
    if (matrix[x][y] === 2) {
      console.log(path);
      console.log(`Here it is: ${x}:${y}`);
      return [true, path];
    }

    visited.add(`${x}:${y}`);

    for (let i = 0; i < dirs.length; i++) {
      let newX = x + parseInt(dirs[i][0]);
      let newY = y + parseInt(dirs[i][1]);
      queue.push([newX, newY, path + `${newX}:${newY},`]);
    }
  }

  return [false, ""];
}

function decodeFromRes() {
  let arr = res[1].split(",");
  for (let i = 1; i < arr.length - 2; i++) {
    let temp = arr[i].split(":");
    matrix[parseInt(temp[0])][parseInt(temp[1])] = 9;
  }
}

// Evaluation Time
var res = Bisearch(myModule.matrix, myModule.N, myModule.src);

//Decoding answer
if (res[0] === true) {
  decodeFromRes();
  //print Matrix in form of Strings
  myModule.printMatrix();
} else {
  console.log("No Path Exists!!!");
}
