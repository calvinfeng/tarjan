import { LaneNode, findStronglyConnectedComponents } from './tarjan';

const node1: LaneNode = new LaneNode(1);
const node2: LaneNode = new LaneNode(2);
const node3: LaneNode = new LaneNode(3);
const node4: LaneNode = new LaneNode(4);
const node5: LaneNode = new LaneNode(5);
const node6: LaneNode = new LaneNode(6);
const node7: LaneNode = new LaneNode(7);
const node8: LaneNode = new LaneNode(8);

node1.connect(node2);
node1.connect(node5);

node2.connect(node6);

node3.connect(node2);
node3.connect(node4);
node3.connect(node7);

node4.connect(node7);

node5.connect(node1);
node5.connect(node6);

node6.connect(node3);
node6.connect(node7);

node7.connect(node8);
node8.connect(node4);


const inputNodeList: LaneNode[] = [node1, node2, node3, node4, node5, node6, node7, node8];
const output = findStronglyConnectedComponents(inputNodeList);

console.log(output);