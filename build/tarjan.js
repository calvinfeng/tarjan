"use strict";
exports.__esModule = true;
var LaneEdge = (function () {
    function LaneEdge(start, end) {
        this.start = start;
        this.end = end;
    }
    return LaneEdge;
}());
exports.LaneEdge = LaneEdge;
var LaneNode = (function () {
    function LaneNode(uuid) {
        this.uuid = uuid;
        this.edges = [];
    }
    LaneNode.prototype.connect = function (other) {
        var newEdge = new LaneEdge(this, other);
        this.edges.push(newEdge);
        return newEdge;
    };
    return LaneNode;
}());
exports.LaneNode = LaneNode;
function findStronglyConnectedComponents(nodes) {
    var currentID = 0;
    var count = 0;
    var pseudoIDs = {};
    var lowLinkVals = {};
    var onStack = {};
    var stack = [];
    var visited = {};
    var dfs = function (current) {
        stack.push(current);
        onStack[current.uuid] = true;
        visited[current.uuid] = true;
        currentID += 1;
        pseudoIDs[current.uuid] = currentID;
        lowLinkVals[current.uuid] = currentID;
        current.edges.forEach(function (edge) {
            if (!visited[edge.end.uuid]) {
                dfs(edge.end);
            }
            if (onStack[edge.end.uuid]) {
                lowLinkVals[current.uuid] = Math.min(lowLinkVals[current.uuid], lowLinkVals[edge.end.uuid]);
            }
        });
        if (pseudoIDs[current.uuid] == lowLinkVals[current.uuid]) {
            while (stack.length > 0) {
                var node = stack.pop();
                onStack[node.uuid] = false;
                lowLinkVals[node.uuid] = lowLinkVals[current.uuid];
                if (node.uuid === current.uuid) {
                    break;
                }
            }
            count++;
        }
    };
    nodes.forEach(function (node) {
        if (!visited[node.uuid]) {
            dfs(node);
        }
    });
    return lowLinkVals;
}
exports.findStronglyConnectedComponents = findStronglyConnectedComponents;
//# sourceMappingURL=tarjan.js.map