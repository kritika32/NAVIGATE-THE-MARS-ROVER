function split(str, idx) {
  return str.split(":")[idx];
}
function printMatrix() {
  for (let i = 0; i < matrix.length; i++) {
    let l = "";
    for (let j = 0; j < matrix[i].length; j++) {
      l += matrix[i][j] + " ";
    }
    console.log(l);
  }
}

function reply_click(obj) {
  let elem = document.getElementById(obj.id);
  if (cnt == 0) {
    if (obj.id === dst_crd) {
      return;
    }
    console.log(obj.id);
    elem.style.fill = "rgb(0,255,0)";
    isSrc = true;
    src_crd = obj.id;
    matrix[split(src_crd, 0)][split(src_crd, 1)] = 1;

    if (!isDst) cnt++;
    else cnt = 10;
  } else if (cnt == 1) {
    if (obj.id === src_crd) {
      return;
    }
    elem.style.fill = "rgb(255,0,0)";
    cnt++;
    dst_crd = obj.id;
    matrix[split(dst_crd, 0)][split(dst_crd, 1)] = 2;
    isDst = true;
  } else {
    if (elem.style.fill.length === 0) {
      elem.style.fill = "rgb(128, 128, 128)";
      matrix[split(obj.id, 0)][split(obj.id, 1)] = 3;
    } else {
      if (elem.style.fill === "rgb(0, 255, 0)") {
        cnt = 0;
        isSrc = false;
        src_crd = "";
      } else if (elem.style.fill === "rgb(255, 0, 0)") {
        cnt = 1;
        isDst = false;
        dst_crd = "";
      } else if (elem.style.fill === "rgb(0, 0, 255)") {
        return;
      }
      matrix[split(obj.id, 0)][split(obj.id, 1)] = 0;
      elem.style.fill = "";
    }
  }
  // console.log("-----------------");
  // printMatrix();
  // console.log("-----------------");
}

function plot(rows = 50, cols = 50) {
  for (let i = 0; i < rows; i++) {
    var x = 0;
    for (let j = 0; j < cols; j++) {
      let colr = "rgb(255, 255, 255)";
      if (j == 0 || i == 0 || j == cols - 1 || i == rows - 1) {
        colr = "rgb(43, 45, 47) ";
      }
      c += `<rect id=${
        i + ":" + j
      } x="${x}" y="${y}" class="button" onClick=reply_click(this) width="30" height="30" r="0" rx="0" ry="0" fill="${colr}" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2;" stroke-opacity="0.2"></rect>`;
      x += 30;
    }
    y += 30;
  }
  document.getElementById("container").innerHTML = c;
}

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

/* Clear the alloted path */
function clearPath(obj) {
  console.log(obj.id);
  let val = 0;
  if (obj.id === "wall") {
    val = 3;
  } else {
    val = 9;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === val) {
        matrix[i][j] = 0;
        document.getElementById(`${i}:${j}`).style.fill = "rgb(255, 255, 255)";
      }
    }
  }
}

/* Start the algorithm */
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

var printPath = function decodeFromRes(res) {
  let arr = res.split(",");
  for (let i = 1; i < arr.length - 2; i++) {
    let temp = arr[i].split(":");
    let nx = parseInt(temp[0]);
    let ny = parseInt(temp[1]);
    matrix[nx][ny] = 9;
    console.log(document.getElementById(`${nx}:${ny}`).style.fill);
    document.getElementById(`${nx}:${ny}`).style.fill = "rgb(0,0,255)";
    console.log("New");
    console.log(document.getElementById(`${nx}:${ny}`).style.fill);
  }
};

function search(matrix) {
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

    if (x < 0 || x >= rows || y < 0 || y >= cols) continue;

    if (visited.has(`${x}:${y}`) || matrix[x][y] === 3) continue;

    if (matrix[x][y] === 2) {
      console.log(`Here it is: ${x}:${y}`);
      console.log(path);
      printPath(path);
      return;
    }

    visited.add(`${x}:${y}`);

    // [[-1, 0], [1, 2]]
    for (let i = 0; i < dirs.length; i++) {
      let newX = x + parseInt(dirs[i][0]); // -1
      let newY = y + parseInt(dirs[i][1]); // 0
      console.log(newX, newY);
      queue.push([newX, newY, path + `${newX}:${newY},`]);
    }
  }

  console.log("No Path Exists");
}

// path -> 11:4,10:4,9:5,10:6,...........6:4,
// arr -> [11:4, 10:4, 9:5, ........ , 6:4, ]

var cnt = 0,
  c = "",
  y = 0,
  rows = 32,
  cols = 58;
var isSrc = true,
  isDst = false;
var src_crd = "",
  dst_crd = "";

function initArray(matrix, rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
        matrix[i][j] = 5;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
}

var matrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(cols);
}
initArray(matrix, rows, cols);
plot(rows, cols);

/* Calling BFS */
function bfs() {
  search(matrix);
}
