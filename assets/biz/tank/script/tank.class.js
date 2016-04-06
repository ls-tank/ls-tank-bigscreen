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
    
    this.component.init(this.equip);
    
    this.appendToPlayground(playgroundNode, this.getInitPosition());
    this.appendToTanksSet();
    
    this.addListener();
}

Tank.prototype.addListener = function() {
    this.node.on('beAttack', event => {
        var bullet = event.detail;
        this.component.hp -= bullet.attack;
        
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
    this.component.destroy();
};

Tank.prototype.rotate = function(direction) {
    var deg = [0, 90, 180, 270];

    this.node.children[1].runAction(cc.rotateTo(0.1, deg[direction]));
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

Tank.prototype.updateHp = function() {
    
};


module.exports = Tank;