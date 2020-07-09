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
  var elem = document.getElementById(obj.id);
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
      c += `<rect id=${
        i + ":" + j
      } x="${x}" y="${y}" onClick=reply_click(this) width="30" height="30" r="0" rx="0" ry="0" fill="rgb(255,255,255)" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2;" stroke-opacity="0.2"></rect>`;
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
var cnt = 0,
  c = "",
  y = 0,
  rows = 50,
  cols = 50;
var isSrc = true,
  isDst = false;
var src_crd = "",
  dst_crd = "";
var matrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(cols);
  matrix[i].fill(0);
}
plot(rows, cols);
