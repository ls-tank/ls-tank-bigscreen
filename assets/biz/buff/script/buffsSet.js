function BuffsSet() {
    var array = {};
    var index = 0;
    
    var push = function(value) {
        array[++index] = value;
        return index;
    };
    
    var remove = function(index) {
        delete array[index];
    };
    
    var getAll = function() {
        return array;
    };
    
    var removeAll = function() {
        for (var i in array) {
            array[i].destroy()
        }
    };
    
    return {
        push: push,
        remove: remove,
        getAll: getAll,
        removeAll: removeAll
    };
}

var buffsSet = new BuffsSet();

module.exports = buffsSet;