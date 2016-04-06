function TanksSet() {
    var sets = {};
    var length = 0;
    
    var has = function(key) {
      return sets.hasOwnProperty(key);  
    };
    
    var set = function(key, value) {
        if (!has(key)) {
            sets[key] = value;
            length++;
        }
    };
    
    var get = function(key) {
        return sets[key];
    };
    
    var remove = function(key) {
        if (has(key)) {
            delete sets[key];
            length--;
        }
    };
    
    var getAll = function() {
        return sets;
    };
    
    var getAllPosition = function() {
        var obj = {};
        for (var i in sets) {
            obj[i] = { x: sets[i].x, y: sets[i].y };
        }
        
        return obj;
    };
    
    var getOthersPosition = function(key) {
        var obj = {};
        for (var i in sets) {
            if (key === i) continue;
            obj[i] = { x: sets[i].x, y: sets[i].y };
        }
        
        return obj;
    };
    
    return {
        length: length,
        set: set,
        get: get,
        remove: remove,
        getAll: getAll,
        getAllPosition: getAllPosition,
        getOthersPosition: getOthersPosition
    }
}

var tanksSet = new TanksSet();

module.exports = tanksSet;