/* Start the algorithm */

function fillArray(parent, p, end) {
  let arr = [];
  let k = p;
  while (k !== end) {
    arr.push(parent[k]);
    k = parent[k];
  }
  return arr;
}

function printPath(p1, p2, k, src, dst) {
  let arr1 = fillArray(p1, k, src).reverse();
  let arr2 = fillArray(p2, k, dst);
  arr1.push(k);
  let arr = arr1.concat(arr2);
  for (let i = 1; i < arr.length - 1; i++) {
    let temp = arr[i].split(":");
    let nx = parseInt(temp[0]);
    let ny = parseInt(temp[1]);
    matrix[nx][ny] = 9;
    document.getElementById(`${nx}:${ny}`).style.fill = "rgb(0, 68, 137)";
  }
}

function bfs(matrix, queue, visited, parent) {
  let rv = queue.shift();
  let x = parseInt(rv[0]),
    y = parseInt(rv[1]);

  for (let i = 0; i < dirs.length; i++) {
    let newX = x + dirs[i][0],
      newY = y + dirs[i][1];

    if (
      newX <= 0 ||
      newY <= 0 ||
      newX > rows - 2 ||
      newY > cols - 2 ||
      matrix[newX][newY] === 1 ||
      matrix[newX][newY] === 2
    ) {
      continue;
    }

    if (!visited.has(`${newX}:${newY}`) && matrix[newX][newY] !== 3) {
      parent[`${newX}:${newY}`] = `${x}:${y}`;
      visited.add(`${newX}:${newY}`);
      document.getElementById(`${newX}:${newY}`).style.fill =
        "rgb(149, 202, 255)";
      // document.getElementById(`${newX}:${newY}`).style.transition = "1s";
      matrix[newX][newY] = 7;

      queue.push([newX, newY]);
    }
  }
}

function intersection(v1, v2) {
  for (const k of v1) {
    if (v2.has(k)) {
      return k;
    }
  }

  return -1;
}

function Bisearch(matrix) {
  console.log(dirs);
  let q1 = [],
    q2 = [],
    v1 = new Set(),
    v2 = new Set(),
    p1 = {},
    p2 = {};
  let src_x = split(src_crd, 0),
    src_y = split(src_crd, 1),
    dst_x = split(dst_crd, 0),
    dst_y = split(dst_crd, 1);

  q1.push([src_x, src_y]);
  v1.add(`${src_x}:${src_y}`);
  q2.push([dst_x, dst_y]);
  v2.add(`${dst_x}:${dst_y},`);

  p1[`${src_x}:${src_y}`] = -1;
  p2[`${dst_x}:${dst_y}`] = -1;

  while (q1.length !== 0 && q2.length !== 0) {
    bfs(matrix, q1, v1, p1);
    bfs(matrix, q2, v2, p2);

    let intr = intersection(v1, v2);
    if (intr !== -1) {
      printPath(p1, p2, intr, `${src_x}:${src_y}`, `${dst_x}:${dst_y}`);
      return;
    }
  }

  console.log("No path exists");
}

function bibfs() {
  Bisearch(matrix);
}

export { bibfs };
