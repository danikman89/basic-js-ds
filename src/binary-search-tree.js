const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.treeRoot === null) {
      this.treeRoot = newNode;
      return;
    }
    let curNode = this.treeRoot;
    while (curNode) {
      if (data === curNode.data) return undefined;
      if (data < curNode.data) {
        if (curNode.left === null) {
          curNode.left = newNode;
          return;
        }
        curNode = curNode.left;
      } else {
        if (curNode.right === null) {
          curNode.right = newNode;
          return;
        }
        curNode = curNode.right;
      }
    }
  }

  has(data) {
    let curNode = this.treeRoot;
    while (curNode) {
      if (curNode.data === data) {
        return true;
      } else if (data < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }
    return false;
  }

  find(data) {
    if (!this.treeRoot) return null;
    let curNode = this.treeRoot;
    let found = false;
    while (curNode && !found) {
      if (data < curNode.data) {
        curNode = curNode.left;
      } else if (data > curNode.data) {
        curNode = curNode.right;
      } else {
        found = curNode;
      }
    }
    if (!found) return null;
    return found;
  }

  remove(data) {
    removeNode(this.treeRoot, data);
    function minNode(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
    function removeNode(node, data) {
      if (node === null) return null;
      if (data === node.data) {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let tempTreeNode = minNode(node.right);
        node.data = tempTreeNode.data;
        node.right = removeNode(node.right, tempTreeNode.data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        node.left = removeNode(node.left, data);
        return node;
      }
    }
  }

  min() {
    let curNode = this.treeRoot;
    while (curNode.left) {
      curNode = curNode.left;
    }
    return curNode.data;
  }

  max() {
    let curNode = this.treeRoot;
    while (curNode.right) {
      curNode = curNode.right;
    }
    return curNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
