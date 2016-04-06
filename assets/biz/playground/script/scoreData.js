var TanksSet = require('tanksSet');

function Score(target, type) {
    this.target = target;
    this.type = type;
    this.timestamp = new Date().getTime();
}

function ScoreData() {
    var data = {};
    
    var has = function(key) {
        return ~Object.keys(data).indexOf(key);
    };
    
    var set = function(key, target, type) {
        var item = new Score(target, type);
        
        if (has(key)) {
            data[key].push(item);
        } else {
            data[key] = [item];
        }
    };
    
    var get = function(key) {
        
    };
    
    var getAll = function() {
        return data;
    };
    
    return {
        set: set,
        get: get,
        getAll: getAll
    };    
}

var scoreData = new ScoreData();

module.exports = scoreData;