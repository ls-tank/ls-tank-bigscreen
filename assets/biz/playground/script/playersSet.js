function PlaysSet() {
    var sets = {};
    
    var has = function(key) {
      return sets.hasOwnProperty(key);  
    };
    
    var set = function(key, value) {
        if (!has(key)) {
            sets[key] = value;
        }
    };
    
    var get = function(key) {
        return sets[key];
    };
    
    var remove = function(key) {
        if (has(key)) {
            delete sets[key];
        }
    };
    
    var getAll = function() {
        return sets;
    };
    
    return {
        set: set,
        get: get,
        remove: remove,
        getAll: getAll
    };
    
}

var playsSet = new PlaysSet();

module.exports = playsSet;