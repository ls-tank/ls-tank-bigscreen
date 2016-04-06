var _ = require('lodash');

exports.isRangeIn = function(target, min, max) {
    return target >= min && target <= max;
};

exports.getRandomPosition = function(maxSize) {
    var maxX = maxSize.width / 2 - 42;
    var maxY = maxSize.height / 2 - 42;
    var randX = cc.randomMinus1To1() * maxX;
    var randY = cc.randomMinus1To1() * maxY;
        
    return cc.p(randX, randY);
};

exports.createUnoccupiedPosition = function(tanksSetAllArray, playgroundSize) {
    var tempPosition = exports.getRandomPosition(playgroundSize);
    
    var positionIsOccupied = tanksSetAllArray.some(function(tank) {
        var max = { x: tank.x + 84, y: tank.y + 84 };
        var min = { x: tank.x - 84, y: tank.y - 84 };
        
        return exports.isRangeIn(tempPosition.x, min.x, max.x) && exports.isRangeIn(tempPosition.y, min.y, max.y);
    });
    
    if (positionIsOccupied) return exports.createUnoccupiedPosition(tanksSetAllArray, playgroundSize);
    else return tempPosition;
};

exports.getNodeSize = function(node) {
    return { 
        width: node.width, 
        height: node.height 
    };
};

exports.isImpactInRange = function(nodes) {
    _.each(nodes, function(me) {
        _.each(nodes, function(target) {
            if (me.owner !== target.owner) {
                if (me.colliderFlags & target.colliderFlag) {
                    var maxX = me.halfSize.x + target.halfSize.x;
                    var maxY = me.halfSize.y + target.halfSize.y;
                        
                    var offsetX = Math.abs(me.x - target.x);
                    var offsetY = Math.abs(me.y - target.y);
                        
                    if (offsetX < maxX && offsetY < maxY) return me.node.emit('collide', target);
                }
            }
        });
    });
};
