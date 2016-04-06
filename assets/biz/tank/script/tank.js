var level = {
    head: [1, 2, 3, 4, 5, 6],
    body: [5, 6, 7, 8, 9, 10],
    wheel: [200, 220, 240, 260, 280, 300]
};

cc.Class({
    extends: cc.Component,
    
    boomEnd: function() {
        this.node.destroy();
    },
    
    properties: {
        heads: {
            default: [],
            type: cc.SpriteFrame
        },
        bodies: {
            default: [],
            type: cc.SpriteFrame
        },
        wheelsPref: {
            default: [],
            type: cc.SpriteFrame
        },
        wheelsNext: {
            default: [],
            type: cc.SpriteFrame
        },
        head: {
            default: null,
            type: cc.Sprite
        },
        body: {
            default: null,
            type: cc.Sprite
        },
        wheelPref: {
            default: null,
            type: cc.Sprite
        },
        wheelNext: {
            default: null,
            type: cc.Sprite
        },
        nickName: {
            default: null,
            type: cc.Label
        },
        hpBox: {
            default: null,
            type: cc.Node
        },
        tank: {
            default: null,
            type: cc.Node
        },
        fireSound: {
            default: null,
            url: cc.AudioClip
        },
        boomSound: {
            default: null,
            url: cc.AudioClip
        }
    },
    
    init: function(equip) {
        this.head.spriteFrame = this.heads[equip.head];
        this.body.spriteFrame = this.bodies[equip.body];
        this.wheelPref.spriteFrame = this.wheelsPref[equip.wheel];
        this.wheelNext.spriteFrame = this.wheelsNext[equip.wheel];
        
        this.nickName.string = equip.nickname;
        
        this.attack = level.head[equip.head];
        this.maxHp = level.body[equip.body];
        this.hp = level.body[equip.body];
        this.speed = level.wheel[equip.wheel];
        
        // this.moveSound = this.node.getComponent('cc.AudioSource');
        // this.moveSound.play();
    },
    
    onLoad: function() {
        this.moveAnim = this.node.children[1].children[1].getComponent('cc.Animation');
        this.boomAnim = this.node.getComponent('cc.Animation');
    },

    update: function(dt) {
        // this.moveSound.play();
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.moveAnim.stop();
            // this.moveSound.stop();
            return; 
        }
            
        if (!this.moveAnim.getAnimationState('move').isPlaying) {
            this.moveAnim.play();   
        }
        
        
        this.node.x += this.velocity.x * dt;
        this.node.y += this.velocity.y * dt;
    },
    
    fireAction: function() {
        cc.audioEngine.playEffect(this.fireSound, false);
    },
    
    boomAction: function() {
        cc.audioEngine.playEffect(this.boomSound, false);
    },
    
    updateHp: function() {
        this.hpBox.width = this.hp / this.maxHp * 80;
    },
    
    boom: function() {
        this.boomAction();
        this.tank.opacity = 0;
        this.boomAnim.play();
    },
    
    onDestroy: function() {
        this.node.destroy();
    }
});
