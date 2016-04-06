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
        this.desc.string = winner + ' 将 ' + loser + ' 击毁!';
    }
});
