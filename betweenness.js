var betweenness;

(function(betweenness) {
  "use strict";


  betweenness.vertex = function() {
    return init().acc(accs.vertex);
  };
  
  betweenness.edge = function() {
    return init().acc(accs.edge);
  };
  
  betweenness.vertexWithEndpoints = function() {
    return init().acc(accs.withEndpoints);
  };
  
  betweenness.init = function() {
    return init();
  };  
    
  function init() {

    var INF = Number.MAX_VALUE / 2;
    // the builder object    
    var b = {};

    var nodes = [],
    outEdges = function(d) { return d.outEdges || []; },
    fi = function(d) { return d.id; },
    accFun = accs.vertex;

    b.nodes = function(n) {
      if (!arguments.length) return nodes;
      nodes = n;
      return b;
    };
    
    b.acc = function(a) {
      if (!arguments.length) return accFun;
      accFun = a;
      return b;
    };
    
    /**
     * Calculate the values and return result
     */
    b.calc = function() {
      var stack = [], // push/pop
      queue = [], // unshift/pop
      dist = [], // distance from source
      Pred = [], // list of predecessors 
      sigma = [], // number of shortest paths
      delta = [], // dependency
      result = [],
      accScope = { // scope injected into the acc funs
        nodes: nodes,
        outEdges: outEdges,
        stack: stack,
        queue: queue,
        dist: dist,
        Pred: Pred,
        sigma: sigma,
        delta: delta,
        result: result,
        fi: fi
      };

      result = accFun.initResult.call(accScope);
      accScope.result = result;
  
      nodes.forEach(function(s) {  
        // initialization
        nodes.forEach(function(w) {
          Pred[fi(w)] = [];
        });
        nodes.forEach(function(t) {
          dist[fi(t)] = INF;
          sigma[fi(t)] = 0;
        });
        dist[fi(s)] = 0;
        sigma[fi(s)] = 1;
        
        queue.unshift(s);
        
        while (queue.length > 0) {
          var v = queue.pop();
          stack.push(v);
        
          outEdges(v).forEach(function(wid) {  
            var w = nodes[wid];
            // path discovery
            if (dist[fi(w)] == INF) {
              dist[fi(w)] = dist[fi(v)] + 1;
              queue.unshift(w);
            }
            // path counting
            if (dist[fi(w)] == dist[fi(v)] + 1) {
              sigma[fi(w)]= sigma[fi(w)] + sigma[fi(v)];
              Pred[fi(w)].push(v);
            }
          });
        }
        
        // accumulation
        accFun.calc.call(accScope, s);
        
      });
      
      return result;
    };
    
    return b;
  }
  
  // ACCUMULATOR
  var accs = {};
  accs.vertex = {
    initResult: function() {
      var r = [];
      for (var i = 0; i < this.nodes.length; i++) {
        r.push(0);
      }
      return r;
    },
    calc: function(s) {
      var t = this;
      t.nodes.forEach(function(v) {
          t.delta[t.fi(v)] = 0;
        });
        while (t.stack.length > 0) {
          var w = t.stack.pop();
          t.Pred[t.fi(w)].forEach(function(v) {
            t.delta[t.fi(v)] = t.delta[t.fi(v)] 
              + (t.sigma[t.fi(v)] / t.sigma[t.fi(w)]) 
              * (1 + t.delta[t.fi(w)]);
          });
          if (t.fi(w) != t.fi(s)) {
            t.result[t.fi(w)] = t.result[t.fi(w)] + t.delta[t.fi(w)];
          }
        }  
    }
  };

      
  accs.withEndpoints = {
    initResult: function() {
      var r = [];
      for (var i = 0; i < this.nodes.length; i++) {
        r.push(0);
      }
      return r;
    },
    calc: function(s) {
      var t = this;    
      t.result[t.fi(s)] = t.result[t.fi(s)] + t.stack.length - 1;
      
      t.nodes.forEach(function(v) {
        t.delta[t.fi(v)] = 0;
      });
      while (t.stack.length > 0) {
        var w = t.stack.pop();
        t.Pred[t.fi(w)].forEach(function(v) {
          t.delta[t.fi(v)] = t.delta[t.fi(v)] 
            + (t.sigma[t.fi(v)] / t.sigma[t.fi(w)]) 
            * (1 + t.delta[t.fi(w)]);
        });
        if (t.fi(w) != t.fi(s)) {
          t.result[t.fi(w)] = t.result[t.fi(w)] + t.delta[t.fi(w)] + 1;
        }
      }
    }  
  };
  
  accs.edge = {
    initResult: function() {
      var r = [];
      for (var i = 0; i < this.nodes.length; i++) {
        r.push([]);
      }
      return r;
    },
    calc: function(s) {
      var t = this;
      t.nodes.forEach(function(v) {
        t.delta[t.fi(v)] = 0;
      });
      
      var result = t.result;
      
      while (t.stack.length > 0) {
        var w = t.stack.pop(),
            wi = t.fi(w); 
        t.Pred[t.fi(w)].forEach(function(v) {
          var c = t.sigma[t.fi(v)] / t.sigma[t.fi(w)] 
                    * (1 + t.delta[t.fi(w)]);
                    
          var vi = t.fi(v);
          if (!result[vi]) result[vi] = [];
          var row = result[vi];
          if (!row[wi]) row[wi] = 0;  
          row[wi] += c;
          t.delta[t.fi(v)] = t.delta[t.fi(v)] + c;
        });
      }
    }
  };
  
})(betweenness || (betweenness = {}));


module.exports = betweenness;
