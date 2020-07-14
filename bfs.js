var myModule = require("./main");
const { matrix, printMatrix } = require("./main");

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
  [-1, -1],
];

function search(matrix, N, src) {
  let queue = [];
  //     x       y           path: "11:4"
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

    // [[-1, 0], [1, 2]]
    for (let i = 0; i < dirs.length; i++) {
      let newX = x + parseInt(dirs[i][0]); // -1
      let newY = y + parseInt(dirs[i][1]); // 0
      queue.push([newX, newY, path + `${newX}:${newY},`]);
    }
  }

  return [false, ""];
}

// path -> 11:4,10:4,9:5,10:6,...........6:4,
// arr -> [11:4, 10:4, 9:5, ........ , 6:4, ]

function decodeFromRes() {
  let arr = res[1].split(",");
  for (let i = 1; i < arr.length - 2; i++) {
    let temp = arr[i].split(":");
    matrix[parseInt(temp[0])][parseInt(temp[1])] = 9;
  }
}

// Evaluation Time
var res = search(myModule.matrix, myModule.N, myModule.src);

//Decoding answer
if (res[0] === true) {
  decodeFromRes();
  //print Matrix in form of Strings
  myModule.printMatrix();
} else {
  console.log("No Path Exists!!!");
}
