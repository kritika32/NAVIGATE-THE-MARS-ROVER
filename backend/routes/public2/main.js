import {
  split,
  reply_click,
  clearPath,
  openNav,
  closeNav,
  isDiagonal,
  src_crd,
  dst_crd,
  fdirs,
} from "./modules/script.js";

import { bfs, matrix } from "./modules/BFS.js";

window.split = split;
window.reply_click = reply_click;
window.clearPath = clearPath;
window.openNav = openNav;
window.closeNav = closeNav;
window.isDiagonal = isDiagonal;
window.src_crd = src_crd;
window.dst_crd = dst_crd;
window.matrix = matrix;
window.dirs = fdirs;
window.bfs = bfs;
