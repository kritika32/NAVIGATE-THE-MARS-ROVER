const FastPriorityQueue = require("fastpriorityqueue");

function search() {
  var pq = new FastPriorityQueue((a, b) => {
    return a < b;
  });

  pq.add(10);
  pq.add(50);
  pq.add(20);
  pq.add(1);

  console.log(pq);
}

function dijkstra() {
  search();
}

dijkstra();
