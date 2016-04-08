var _ = require('lodash');
var utils = require('utils');

var TanksSet = require('tanksSet');
var ToastQueue = require('toastQueue');

var Connect = require('connect');

function Tank(prefab, options, playgroundNode) {
    this.type = 'Tank';
    this.key = options.uid;
    this.owner = options.uid;
    this.nickname = options.nickname;
    
    this.node = cc.instantiate(prefab);
    this.component = this.node.getComponent('tank');
    
    this.colliderFlag = 2;
    this.colliderFlags = 2;
    
    
    
    this.component.velocity = { x: 0, y: 0 };
    this.component.direction = 0;
    this.component.halfSize = { x: 36, y: 36 };
    
    Object.defineProperty(this, 'x', {
        get: function() { return this.node.x; }
    });
    
    Object.defineProperty(this, 'y', {
        get: function() { return this.node.y; }
    });
    
    Object.defineProperty(this, 'halfSize', {
        get: function() { return this.component.halfSize; }
    });
    
    this.equip = {
        head: options.head,
        body: options.body,
        wheel: options.wheel,
        nickname: options.nickname
    };
    
    this.price = (this.equip.head + this.equip.body + this.equip.wheel + 3) * 60;
    
    this.component.init(this.equip);
    
    this.appendToPlayground(playgroundNode, this.getInitPosition());
    this.appendToTanksSet();
    
    this.addListener();
    
    this.component.buffs = {
        attack: 0,
        def: 0,
        speed: 0
    };
}

Tank.prototype.addListener = function() {
    
    this.interval = setInterval(() => {
        var items = this.component.buffs;
        for (var i in items) {
            if (items[i] === 1) {
                this.hideBuff(i);
            }
            
            if (items[i] > 0) {
                items[i]--
            }
        }
    }, 1000);
    
    this.node.on('beAttack', event => {
        this.component.explosionAction();
        
        var bullet = event.detail;
        var attack = this.component.buffs.def > 0 ? bullet.attack / 2 : bullet.attack;
        this.component.hp -= attack;
        
        this.component.updateHp();
        
        if (this.component.hp <= 0) {
            var winner = bullet.owner;
            var loser = this.key;
            
            Connect.emit('score', {
                winner: winner
            });
            
            ToastQueue.push(winner, loser);
            TanksSet.remove(this.key);
            this.component.boom();
        } 
    });
    
    this.node.on('collide', event => {
        var target = event.detail;
        
        if (target.type === 'Tank') {
            this.component.velocity = { x: -this.component.velocity.x, y: -this.component.velocity.y };
        }
    });
    
    this.node.on('boomEnd', event => {
        // todo 携带攻击者的信息
        Connect.emit('b-boom', {
            loser: this.key
        }); 
    });
    
};

Tank.prototype.appendToPlayground = function(playgroundNode, tankPosition) {
    var tankNode = this.node;
    
    tankNode.setPosition(tankPosition);    
    playgroundNode.addChild(tankNode);
    
    return this;
};

Tank.prototype.appendToTanksSet = function() {
    TanksSet.set(this.key, this);
    
    return this;
};

Tank.prototype.getInitPosition = function() {
    return utils.createUnoccupiedPosition(_.toArray(TanksSet.getAllPosition()), { width: 1440, height: 1080 });
};

Tank.prototype.destroy = function() {
    clearInterval(this.interval);
    this.component.destroy();
};

Tank.prototype.rotate = function(direction) {
    var deg = [0, 90, 180, 270];

    this.node.children[2].runAction(cc.rotateTo(0.1, deg[direction]));
};

Tank.prototype.changeMotionState = function(direction) {
    var velocity = [
        { x: 0, y: this.component.speed },
        { x: this.component.speed, y: 0 },
        { x: 0, y: -this.component.speed },
        { x: -this.component.speed, y: 0 },
        { x: 0, y: 0 }
    ];
    
    this.component.velocity = velocity[direction];
    
    if (direction !== 4) {
        this.component.direction = direction;
        this.rotate(direction);
    }
};

Tank.prototype.getPosition = function() {
    return {
        x: this.node.x,
        y: this.node.y
    };
};

Tank.prototype.showBuff = function(type) {
    if (type === 'hp') {
        if (this.component.hp < this.component.maxHp) {
            this.component.hp++;
            this.component.updateHp();
        }
        return;
    }
    this.component.buffs[type] = 15;
    var index = {
        attack: 0,
        def: 1,
        speed: 2
    }[type];
    this.component.showBuff(index);
};

Tank.prototype.hideBuff = function(type) {
    var index = {
        attack: 0,
        def: 1,
        speed: 2
    }[type];
    this.component.hideBuff(index);
};

module.exports = Tank;