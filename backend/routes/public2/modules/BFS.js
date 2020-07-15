import matrix from "./createMatrix.js";
import { clearPath, dst_crd, src_crd, fdirs } from "./script.js";
/* Start the algorithm */
var printPath = function decodeFromRes(res) {
  let arr = res.split(",");
  // console.log(arr);
  for (let i = 1; i < arr.length - 1; i++) {
    let temp = arr[i].split(":");
    let nx = parseInt(temp[0]);
    let ny = parseInt(temp[1]);
    matrix[nx][ny] = 9;
    console.log(document.getElementById(`${nx}:${ny}`).style.fill);
    document.getElementById(`${nx}:${ny}`).style.fill = "rgb(0, 68, 137)";
  }
};

function search(matrix) {
  clearPath("wall");
  clearPath("path");
  var dirs = fdirs;
  let queue = [];
  let src_x = split(src_crd, 0),
    src_y = split(src_crd, 1);

  queue.push([src_x, src_y, `${src_x}:${src_y},`]);
  let visited = new Set();

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
        document.getElementById(`${newX}:${newY}`).style.fill =
          "rgb(149, 202, 255)";
        matrix[newX][newY] = 7;
      } else if (matrix[newX][newY] === 2) {
        // console.log(`Here it is: ${newX}:${newY}`);
        // console.log(path + `${newX}:${newY}`);
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

function bfs() {
  search(matrix);
}

export { bfs, matrix };
