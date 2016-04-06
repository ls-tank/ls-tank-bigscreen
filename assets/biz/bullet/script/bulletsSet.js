var _ = require('lodash');

function BulletsSet() {
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
    
    return {
        push: push,
        remove: remove,
        getAll: getAll
    }
}

var bulletsSet = new BulletsSet();

module.exports = bulletsSet;