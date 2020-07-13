var rows = 30,
  cols = 48;

function plot(rows = 30, cols = 50) {
  let c = "",
    y = 0;
  for (let i = 0; i < rows; i++) {
    var x = 0;
    for (let j = 0; j < cols; j++) {
      let colr = "rgb(134, 136, 138)";
      if (j == 0 || i == 0 || j == cols - 1 || i == rows - 1) {
        colr = "rgb(54, 69, 79)";
      }
      c += `<rect id=${
        i + ":" + j
      } x="${x}" y="${y}" class="btn" onClick=reply_click(this) width="30" height="30" r="0" rx="0" ry="0" fill="${colr}" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2;" stroke-opacity="0.2"></rect>`;
      x += 30;
    }
    y += 30;
  }
  if (document.getElementById("container"))
    document.getElementById("container").innerHTML = c;
}

//Driver
plot(30, 48);
