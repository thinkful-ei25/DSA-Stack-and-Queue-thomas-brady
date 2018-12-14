'use strict';

class _Node {
  constructor(data, next) {
    this.next = next;
    this.data = data;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }

    const node = new _Node(data, this.top);
    this.top = node;
  }

  pop() {
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

function peek(stack) {
  console.log(stack.top.data);
}

function display(stack) {
  let currentNode = stack.top;
  while (currentNode !== null) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
}

function main() {
  let starTrek = new Stack();
  starTrek.push('Kirk');
  peek(starTrek);
  starTrek.push('Spock');
  peek(starTrek);
  starTrek.push('McCoy');
  peek(starTrek);
  starTrek.push('Scotty');
  peek(starTrek);
  display(starTrek);
  starTrek.pop();
  display(starTrek);
}

main();