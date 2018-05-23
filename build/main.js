"use strict";
exports.__esModule = true;
var tarjan_1 = require("./tarjan");
var node1 = new tarjan_1.LaneNode(1);
var node2 = new tarjan_1.LaneNode(2);
node1.connect(node2);
var inputNodeList = [node1, node2];
var output = tarjan_1.findStronglyConnectedComponents(inputNodeList);
console.log(output);
//# sourceMappingURL=main.js.map