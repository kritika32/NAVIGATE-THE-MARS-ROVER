var rows = 30,
  cols = 48;

console.log($(window).width());
console.log($("form").serialize());
var svg = document.getElementById("container");
svg.style.width = $(window).width();
const w = $(window).width;
document.getElementById("reset").style.width = `${w}px`;
document.getElementById("start").style.width = $(window).width();
if ($(window).width() >= 1500) {
  cols = 64;
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
  if (document.getElementById("container"))
    document.getElementById("container").innerHTML = c;
}

//Driver
plot(rows, cols);

window.rows = rows;
window.cols = cols;
