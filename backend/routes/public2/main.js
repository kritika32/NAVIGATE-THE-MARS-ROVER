import {
  split,
  activate,
  deactivate,
  reply_click,
  clearPath,
  openNav,
  closeNav,
  isDiagonal,
  Direct,
  biDirection,
  src_crd,
  dst_crd,
  fdirs,
  matrix,
} from "./modules/script.js";

import { bfs } from "./modules/BFS.js";
import { bibfs } from "./modules/BIBFS.js";

window.split = split;
window.activate = activate;
window.reply_click = reply_click;
window.deactivate = deactivate;
window.clearPath = clearPath;
window.openNav = openNav;
window.closeNav = closeNav;
window.isDiagonal = isDiagonal;
window.src_crd = src_crd;
window.dst_crd = dst_crd;
window.matrix = matrix;
window.dirs = fdirs;
window.bfs = bfs;
window.bibfs = bibfs;
window.Direct = Direct;
window.biDirection = biDirection;
