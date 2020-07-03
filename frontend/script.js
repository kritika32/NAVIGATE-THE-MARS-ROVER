var c = "",
  y = 0;
for (let i = 0; i < 100; i++) {
  var x = 0;
  for (let j = 0; j < 101; j++) {
    c += `<rect x="${x}" y="${y}" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2;" stroke-opacity="0.2"></rect>`;
    x += 30;
  }
  y += 30;
}
document.getElementById("container").innerHTML = c;
