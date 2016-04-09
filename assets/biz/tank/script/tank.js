

var level = {
    head: [1, 2, 3, 4, 5, 6],
    body: [5, 6, 7, 8, 9, 10],
    wheel: [200, 220, 240, 260, 280, 300]
};

cc.Class({
    extends: cc.Component,
    
    boomEnd: function() {
        this.node.destroy();
        this.node.emit('boomEnd');
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
        },
        showSound: {
            default: null,
            url: cc.AudioClip
        },
        explosionSound: {
            default: null,
            url: cc.AudioClip
        },
        buffsEffects: {
            default: [],
            type: cc.Sprite  
        },
        isMove: false,
        
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
        
    },
    
    onLoad: function() {
        this.moveAnim = this.node.children[2].children[1].getComponent('cc.Animation');
        this.boomAnim = this.node.getComponent('cc.Animation');
        
        cc.audioEngine.playEffect(this.showSound, false);
        
        this.buffsAnims = this.buffsEffects.map(item => {
            item.setVisible(false);
            return item.node.getComponent('cc.Animation');
        });
        
        this.moveSound = this.node.getComponent('cc.AudioSource')
        // setInterval(() => {
        //     if (this.isMove) {
        //         this.moveSound.play();
        //     }
        // }, 100);
    },

    update: function(dt) {
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.isMove = false;
            this.moveAnim.stop();
            return; 
        }
        
        this.isMove = true;
        if (!this.moveAnim.getAnimationState('move').isPlaying) {
            this.moveAnim.play();   
        }
        
        var x = this.buffs.speed > 0 ? this.velocity.x * 1.5 : this.velocity.x;
        var y = this.buffs.speed > 0 ? this.velocity.y * 1.5 : this.velocity.y;
        this.node.x += x * dt;
        this.node.y += y * dt;
    },
    
    fireAction: function() {
        cc.audioEngine.playEffect(this.fireSound, false);
    },
    
    boomAction: function() {
        cc.audioEngine.playEffect(this.boomSound, false);
    },
    
    explosionAction: function() {
        cc.audioEngine.playEffect(this.explosionSound, false);
    },
    
    updateHp: function() {
        this.hpBox.width = this.hp / this.maxHp * 80;
    },
    
    showBuff: function(index) {
        this.buffsEffects[index].setVisible(true);
        this.buffsAnims[index].play();
    },
    
    hideBuff: function(index) {
        this.buffsEffects[index].setVisible(false);
        this.buffsAnims[index].stop();
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
