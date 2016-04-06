var ToastQueue = require('toastQueue');
var PlayersSet = require('playersSet');

cc.Class({
    extends: cc.Component,

    properties: {
        tpls: {
            default: [],
            type: cc.Node
        }
    },

    onLoad: function() {
        this.tpl0 = this.tpls[0].getComponent('toastTpl0');
        
        ToastQueue.sub(data => {
            var winner = PlayersSet.get(data.winner);
            var loser = PlayersSet.get(data.loser);

            this.tpl0.updateData(winner, loser);
        });
        setInterval(() => {
            ToastQueue.shift();
        }, 1000);
    }
});
