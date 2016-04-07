var _ = require('lodash');

var TanksSet = require('tanksSet');
var BulletsSet = require('bulletsSet');
var BuffsSet = require('buffsSet');

var NodePool = {
    get: function() {
        var bulletsSet = BulletsSet.getAll();
        var tanksSet = TanksSet.getAll();
        var buffsSet = BuffsSet.getAll();
        
        return _.toArray(bulletsSet)
            .concat(_.toArray(tanksSet))
            .concat(_.toArray(buffsSet));
    }
};

module.exports = NodePool;