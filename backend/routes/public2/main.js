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
  matrix,
} from "./modules/script.js";

import { bfs } from "./modules/Algos/BFS.js";
import { bibfs } from "./modules/Algos/BIBFS.js";

window.split = split;
window.activate = activate;
window.reply_click = reply_click;
window.deactivate = deactivate;
window.clearPath = clearPath;
window.openNav = openNav;
window.closeNav = closeNav;
window.isDiagonal = isDiagonal;
window.bfs = bfs;
window.bibfs = bibfs;
window.Direct = Direct;
window.biDirection = biDirection;
window.matrix = matrix;
