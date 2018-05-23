import { LaneNode, findStronglyConnectedComponents } from './tarjan';

const node1: LaneNode = new LaneNode(1);
const node2: LaneNode = new LaneNode(2);

node1.connect(node2);
// node2.connect(node1);

const inputNodeList: LaneNode[] = [node1, node2];

const output = findStronglyConnectedComponents(inputNodeList);

console.log(output);