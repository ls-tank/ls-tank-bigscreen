cc.Class({
    extends: cc.Component,

    properties: {
        buff: {
            default: null,
            type: cc.Sprite
        },
        buffsArray: {
            default: [],
            type: cc.SpriteFrame
        },
        buffSound: {
            default: null,
            url: cc.AudioClip
        }
    },
    
    getBuff: function() {
        cc.audioEngine.playEffect(this.buffSound, false);
    },
    
    init: function(type) {
        this.buff.spriteFrame = this.buffsArray[type];
    },
    
    onDestroy: function() {
        this.node.destroy();
    }
});
