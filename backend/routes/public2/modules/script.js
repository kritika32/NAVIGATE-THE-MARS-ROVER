//Initialize variables
var cnt = 0,
  isSrc = true,
  isDst = false,
  src_crd = "",
  dst_crd = "",
  rows = 30,
  cols = 48;

export var fdirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

var toggleDirs = false;
var dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
  // [-1, 1],
  // [1, 1],
  // [1, -1],
  // [-1, -1],
];

const dia = [
  [-1, 1],
  [-1, -1],
  [1, -1],
  [1, 1],
];

//To initiate the diagonal moves
function isDiagonal() {
  fdirs = dirs;
  toggleDirs = !toggleDirs;
  if (toggleDirs) fdirs = fdirs.concat(dia);
}

// code to change color while clicking of code
function split(str, idx) {
  return str.split(":")[idx];
}

var isColor = false;
function activate(e) {
  // console.log("Activate");
  isColor = true;
  reply_click(e);
}

function deactivate(obj) {
  isColor = false;
}

function reply_click(obj) {
  if (!isColor) {
    return;
  }
  let elem = document.getElementById(obj.id);
  let x = split(obj.id, 0);
  let y = split(obj.id, 1);

  if (x == 0 || x == rows - 1 || y == 0 || y == cols - 1) {
    return;
  }

  if (
    elem.style.fill === "rgb(0, 68, 137)" ||
    elem.style.fill === "rgb(149, 202, 255)"
  ) {
    return;
  }
  if (cnt == 0) {
    if (obj.id === dst_crd) {
      return;
    }

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
      elem.style.fill = "rgb(43, 45, 47)";
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
      } else if (elem.style.fill === "rgb(149, 202, 255)") {
        return;
      }
      matrix[split(obj.id, 0)][split(obj.id, 1)] = 0;
      elem.style.fill = "";
    }
  }
}
//Clear Path
/* Clear the alloted path */
function clearPath(obj) {
  let val = 0;
  if (obj.id === "wall") {
    val = 3;
  } else {
    val = 9;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (val === 9 && matrix[i][j] === 7) {
        matrix[i][j] = 0;
        document.getElementById(`${i}:${j}`).style.fill = "";
        continue;
      }

      if (val === 9 && matrix[i][j] === 9) {
        matrix[i][j] = 0;
        document.getElementById(`${i}:${j}`).style.fill = "";
        document.getElementById(`${i}-${j}-${0}`).style.stroke = "";
        document.getElementById(`${i}-${j}-${1}`).style.stroke = "";
        document.getElementById(`${i}-${j}-${2}`).style.stroke = "";
        document.getElementById(`${i}-${j}-${3}`).style.stroke = "";
      }
      if (matrix[i][j] === val) {
        matrix[i][j] = 0;
        document.getElementById(`${i}:${j}`).style.fill = "";
      }
    }
  }
}

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "300px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
export {
  split,
  activate,
  deactivate,
  reply_click,
  clearPath,
  openNav,
  closeNav,
  isDiagonal,
  src_crd,
  dst_crd,
  dirs,
};
