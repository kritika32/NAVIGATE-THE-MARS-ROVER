var rows = 30,
  cols = 48;

// code to change color while clicking of code
function split(str, idx) {
  return str.split(":")[idx];
}

var lines = [
  [
    // |
    [15, 0],
    [15, 30],
  ],
  [
    // -
    [0, 15],
    [30, 15],
  ],
  [
    // \
    [0, 0],
    [30, 30],
  ],
  [
    // /
    [0, 30],
    [30, 0],
  ],
];

function plot(rows = 30, cols = 50) {
  let c = "",
    y = 0;
  for (let i = 0; i < rows; i++) {
    var x = 0;
    for (let j = 0; j < cols; j++) {
      let colr = "rgb(163, 173, 184)";
      let line_c = "";
      if (j == 0 || i == 0 || j == cols - 1 || i == rows - 1) {
        colr = "rgb(51, 51, 102)";
        line_c = "";
      }
      c += `<rect id=${
        i + ":" + j
        } x="${x}" y="${y}"  onmousedown="activate(this)"  onmouseover="reply_click(this)" onmouseup="deactivate(this)" class="btn" width="30" height="30" r="0" rx="0" ry="0" fill="${colr}" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2;" stroke-opacity="0.2"></rect>`;

      for (let k = 0; k < lines.length; k++) {
        let x1 = x + lines[k][0][0];
        let y1 = y + lines[k][0][1];
        let x2 = x + lines[k][1][0];
        let y2 = y + lines[k][1][1];
        c += `<line id=${i}-${j}-${k} x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${line_c}" stroke-width="2"></line>`;
      }
      x += 30;
    }
    y += 30;
  }
  document.getElementById("container").innerHTML = c;
  document.getElementById(src_crd).style.fill = "rgb(0, 255, 0)";
  matrix[split(src_crd, 0)][split(src_crd, 1)] = 1;


  document.getElementById(dst_crd).style.fill = "rgb(255, 0, 0)";
  matrix[split(dst_crd, 0)][split(dst_crd, 1)] = 2;


}

function createMatrix() {
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
  return matrix;
}
var matrix = createMatrix();

window.rows = rows;
window.cols = cols;
window.src_crd = "10:15";
window.dst_crd = "10:30";
window.matrix = matrix;
//Driver
plot(rows, cols);
