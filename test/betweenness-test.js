var betweenness = require("../betweenness");

exports['test different betweenness implementations'] = function(assert) {

  var nodes = [
    {
      id: 0,
      outEdges: [1]
    },
    {
      id: 1,
      outEdges: [2, 4]
    },
    { id: 2 },
    {
      id: 3,
      outEdges: [0]
    }, 
    { id: 4 }
  ];
  
  
  var vals = betweenness.vertex()
                .nodes(nodes)
                .calc();
  assert.deepEqual(vals, [3,4,0,0,0], 'Vertex centrality');
  
  vals = betweenness.vertexWithEndpoints()
                .nodes(nodes)
                .calc();
  assert.deepEqual(vals, [7,8,3,4,3], 'Vertex centrality with endpoints');
  
  vals = betweenness.edge()
                .nodes(nodes)
                .calc();
  assert.deepEqual(vals, [[ , 6], [ , , 3, , 3], [], [ 4 ], [] ], 'Edge centrality');
  
};

if (module == require.main) require('test').run(exports);
