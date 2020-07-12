function split(str, idx) {
    return str.split(":")[idx];
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
  
      if (!isDst) cnt++;
      else cnt = 10;
    } else if (cnt == 1) {
      if (obj.id === src_crd) {
        return;
      }
      elem.style.fill = "rgb(255,0,0)";
      cnt++;
      dst_crd = obj.id;
      isDst = true;
    } else {
      if (elem.style.fill.length === 0) {
        elem.style.fill = "rgb(128, 128, 128)";
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
  
  var cnt = 0,
    c = "",
    y = 0,
    rows = 32,
    cols = 58;
  var isSrc = true,
    isDst = false;
  var src_crd = "",
    dst_crd = "";
  
  plot(rows, cols);
  
  