class LaneEdge {
    start: LaneNode
    end: LaneNode

    constructor(start: LaneNode, end: LaneNode) {
        this.start = start;
        this.end = end;
    }
}

class LaneNode {
    uuid: number
    edges: Array<LaneEdge>
    
    /**
     * Instantiate a new node.
     * @param uuid Universally unique ID for uniquely identifying this node.
     */
    constructor(uuid: number) {
        this.uuid = uuid;
        this.edges = [];
    }

    /**
     * Connect this node to another node through an edge.
     * @param other The node which it connects to, only this node has reference to the newly 
     * created edge.
     */
    connect(other: LaneNode) {
        const newEdge = new LaneEdge(this, other);
        this.edges.push(newEdge);
        return newEdge;
    }
}

// Low link value of a node is the smallest node ID reachable from that node when doing DFS
// (including itself.)

// Stack Invariant: To cope with the random traversal order of the DFS, Tarjan's algorithm maintains 
// a set of valid nodes from which to update low-link values from. Nodes are added to the stack of
// valid nodes as they're explored for the first time. Nodes are removed from the stack each time 
// a complete SCC is found.

// Algorithm Overview
// 1. Mark each node as unvisited, identify them by their UUID.
// 
// 2. Start DFS on a random node. Upon visiting a node, assign it a pseudo-ID, which is different
// from the UUID above, and a low-link value. Mark the node as visited and add it to the stack.
//
// 3. Inside the DFS, the recursive call is applied on each of the neighbors of a given node. The
// DFS is called on the neighbor if it is unvisited. After the DFS has returned, check if the
// the neighbor is in the stack. If it is, then compare its low-link value to the current node's 
// low link value and update current node's low link value if neighbor has a lesser low link value.
// 
// 4. After visiting all neighbors, if the current node is the start of a strongly connected
// component, pop off nodes from the stack until current node is reached.

interface Map<T> {
    [key: number]: T;
}

function findStronglyConnectedComponents(nodes: LaneNode[]) {
    let currentID: number = 0;
    let count: number = 0;
    
    const pseudoIDs: Map<number> = {};
    const lowLinkVals: Map<number> = {};
    
    // Create a stack and a boolean map to indicate whether a node is on stack.
    const onStack: Map<boolean> = {}; 
    const stack: LaneNode[] = [];
    
    // Keep track of whether nodes have been visited.
    const visited: Map<boolean> = {};
    
    const dfs = (current: LaneNode) => {
        stack.push(current);
        onStack[current.uuid] = true;
        visited[current.uuid] = true;
        
        currentID += 1;
        pseudoIDs[current.uuid] = currentID;
        lowLinkVals[current.uuid] = currentID;

        // Visit all neighbors
        current.edges.forEach((edge) => {
            // If a neighbor isn't visited, call DFS recursively on it.
            if (!visited[edge.end.uuid]) {
                dfs(edge.end);
            }

            // After the DFS call, check if neighbor is on stack. If yes, update low link values.
            if (onStack[edge.end.uuid]) {
                lowLinkVals[current.uuid] = Math.min(lowLinkVals[current.uuid], 
                                                       lowLinkVals[edge.end.uuid]);
            }
        });

        // If current node is the start of a SSC, pop everything off the stack and  update their low
        // link values until it reaches the current node.
        if (pseudoIDs[current.uuid] == lowLinkVals[current.uuid]) {
            while (stack.length > 0) {
                const node: LaneNode = stack.pop();
                onStack[node.uuid] = false;
                lowLinkVals[node.uuid] = lowLinkVals[current.uuid];
                if (node.uuid === current.uuid) {
                    break;
                }
            }

            count++;
        }
    }

    nodes.forEach((node) => {
        if (!visited[node.uuid]) {
            dfs(node);
        }
    });

    return lowLinkVals;
}

export { LaneEdge, LaneNode, findStronglyConnectedComponents};