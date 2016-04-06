cc.Class({
    extends: cc.Component,

    properties: {
        bullets: {
            default: [],
            type: cc.SpriteFrame
        },
        bullet: {
            default: null,
            type: cc.Sprite
        }
    },
    
    init: function(level) {
        this.bullet.spriteFrame = this.bullets[level];
    },
        
    onLoad: function() {

    },

    update: function(dt) {
        if (this.node.x > 720 || this.node.x < -720 || this.node.y > 540 || this.node.y < -540) {
            return this.node.emit('outOfPlayground');
        }
        
        this.node.x += this.velocity.x * dt;
        this.node.y += this.velocity.y * dt;
    },
    
    onDestroy: function() {
        this.node.destroy();
    }
});
