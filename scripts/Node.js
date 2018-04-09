class Node {
  constructor(data = null) {
    this.data = data;
    this.end = false;
    this.children = {};
    this.weight = 0;
  }
}

module.exports = Node;