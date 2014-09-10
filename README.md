Betweenness.js
=================

Determines the [_betweenness centrality_][betweenness] values of a 
graph using Brandes' algorithm [On variants of shortest-path betweenness centrality and their generic computation \[2008\]][paper].

Usage
-----
```js
var nodes = [ 
    { id: 0, outEdges: [ 1 ] }, 
    { id: 1 } ];

var betweenness = require("betweenness");
betweenness.vertex().nodes(nodes).calc();
```

Install
-------
```bash
npm install betweenness
```

Supported Betweenness Types
---------------------------
Type  |  Implementation | Description
----- | --------------- | -----------
Vertex Betweenness | `vertex()` | Classic shortest-path betweenness, the score of `v` equals the number of shortest paths `v` lies on.
Vertex Betweenness with Endpoints | `vertexWithEndpoints()` | Same as before, adds to the score of a `v` the number of vertices that can be reached by `v` and that reach `v`.
Edge Betweenness | `edge()` | The score of an edge `e` is the number of shortest paths `e` is part of.

In Brandes' paper more variants are listed and 
it is easy to add them to the implementation. 
If you miss a variation feel free to add it. 


[betweenness]: http://en.wikipedia.org/wiki/Betweenness_centrality 
[paper]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf