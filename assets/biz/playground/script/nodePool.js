var _ = require('lodash');

var TanksSet = require('tanksSet');
var BulletsSet = require('bulletsSet');

var NodePool = {
    get: function() {
        var bulletsSet = BulletsSet.getAll();
        var tanksSet = TanksSet.getAll();
        
        return _.toArray(bulletsSet)
            .concat(_.toArray(tanksSet))
    }
};

module.exports = NodePool;