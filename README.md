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

[betweenness]: http://en.wikipedia.org/wiki/Betweenness_centrality 
[paper]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf