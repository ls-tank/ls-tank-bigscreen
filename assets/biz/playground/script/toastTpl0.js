cc.Class({
    extends: cc.Component,

    properties: {
        desc: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function() {

    },
    
    updateData: function(winner, loser) {
        this.desc.string = winner.nickname + ' 将 ' + loser.nickname + ' 击毁! ' + '获得了 ' + loser.price + ' 个钻石!';
    }
});
