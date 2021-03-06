var myModule = require("./main");
myModule.matrix, myModule.N, myModule.src, myModule.dst;
var matrix = myModule.matrix,
  rows = myModule.N,
  cols = myModule.N,
  src_crd = `${myModule.src[0]}:${myModule.src[1]}`,
  dst_crd = `${myModule.dst[0]}:${myModule.dst[1]}`;

const dirs = [
  [-1, 0],
  [0, 1],
  [-1, 1],
  [1, 0],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, -1],
];

// code to change color while clicking of code
function split(str, idx) {
  return str.split(":")[idx];
}

function fillArray(parent, p, end) {
  let arr = [];
  let k = p;
  while (k !== end) {
    arr.push(parent[k]);
    k = parent[k];
  }
  return arr;
}

function printPath(p1, p2, k, src, dst) {
  let arr1 = fillArray(p1, k, src).reverse();
  let arr2 = fillArray(p2, k, dst);
  arr1.push(k);
  let arr = arr1.concat(arr2);
  for (let i = 1; i < arr.length - 1; i++) {
    let temp = arr[i].split(":");
    let nx = parseInt(temp[0]);
    let ny = parseInt(temp[1]);
    matrix[nx][ny] = 9;
  }
}

function BS(matrix, queue, visited) {
  while (queue.length != 0) {
    let rp = queue.shift();
    let x = parseInt(rp[0]);
    let y = parseInt(rp[1]);
    let path = rp[2];

    // if (x < 0 || x >= rows - 3 || y < 0 || y >= cols - 3) continue;
    if (visited.has(`${x}:${y}`)) continue;

    visited.add(`${x}:${y}`);

    // [[-1, 0], [1, 2]]
    for (let i = 0; i < dirs.length; i++) {
      let newX = x + parseInt(dirs[i][0]); // -1
      let newY = y + parseInt(dirs[i][1]); // 0

      if (newX <= 0 || newX > rows - 2 || newY <= 0 || newY > cols - 2) {
        continue;
      }
      if (matrix[newX][newY] != 1 && matrix[newX][newY] != 2) {
        if (matrix[newX][newY] === 3) {
          continue;
        }

        matrix[newX][newY] = 7;
      } else if (matrix[newX][newY] === 2) {
        console.log(`Here it is: ${newX}:${newY}`);
        console.log(path + `${newX}:${newY}`);
        printPath(path + `${newX}:${newY}`);
        return;
      } else {
        continue;
      }
      queue.push([newX, newY, path + `${newX}:${newY},`]);
    }
  }

  console.log("No Path Exists");
}

function bfs(matrix, queue, visited, parent) {
  let rv = queue.shift();
  let x = parseInt(rv[0]),
    y = parseInt(rv[1]);
  path = rv[2];

  for (let i = 0; i < dirs.length; i++) {
    let newX = x + dirs[i][0],
      newY = y + dirs[i][1];

    if (!visited.has(`${newX}:${newY}`) && matrix[newX][newY] !== 3) {
      parent[`${newX}:${newY}`] = `${x}:${y}`;
      visited.add(`${newX}:${newY}`);

      queue.push([newX, newY]);
    }
  }
}

function intersection(v1, v2) {
  for (const k of v1) {
    if (v2.has(k)) {
      return k;
    }
  }

  return -1;
}

function Bisearch(matrix) {
  let q1 = [],
    q2 = [],
    v1 = new Set(),
    v2 = new Set(),
    p1 = {},
    p2 = {};
  let src_x = split(src_crd, 0),
    src_y = split(src_crd, 1),
    dst_x = split(dst_crd, 0),
    dst_y = split(dst_crd, 1);

  q1.push([src_x, src_y]);
  v1.add(`${src_x}:${src_y}`);
  q2.push([dst_x, dst_y]);
  v2.add(`${dst_x}:${dst_y},`);

  p1[`${src_x}:${src_y}`] = -1;
  p2[`${dst_x}:${dst_y}`] = -1;

  while (q1.length !== 0 && q2.length !== 0) {
    bfs(matrix, q1, v1, p1);
    bfs(matrix, q2, v2, p2);

    let intr = intersection(v1, v2);
    if (intr !== -1) {
      console.log("intr", intr);
      console.log("Path exists");
      printPath(p1, p2, intr, `${src_x}:${src_y}`, `${dst_x}:${dst_y}`);
      return;
    }
  }

  console.log("No path exists");
}

// Evaluation Time
Bisearch(myModule.matrix);
myModule.printMatrix(matrix);
