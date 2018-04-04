class Node {
  constructor(data = null) {
    this.data = data;
    this.end = false;
    this.children = {};
  }
}

module.exports = Node;