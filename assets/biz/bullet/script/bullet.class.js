var BulletsSet = require('bulletsSet');

function Bullet(prefab, options, playgroundNode) {
    this.type = 'Bullet';
    this.key = '';
    this.owner = options.uid;
    this.attack = options.attack;
    
    this.node = cc.instantiate(prefab);
    this.component = this.node.getComponent('bullet');
    
    this.colliderFlag = 1;
    this.colliderFlags = 3;
    
    this.component.speed = 800;
    this.component.velocity = { x: 0, y: 0 };
    
    this.component.init(options.level);
    
    this.getHalfSize();
    
    Object.defineProperty(this, 'x', {
        get: function() { return this.node.x; }
    });
    
    Object.defineProperty(this, 'y', {
        get: function() { return this.node.y; }
    });
    
    Object.defineProperty(this, 'halfSize', {
        get: function() { return this.component.halfSize; }
    });
    
    this.rotate(options.direction);
    this.setMotionState(options.direction);
    
    this.appendToPlayground(playgroundNode, options.position);
    this.appendToBulletsSet();
    
    this.addListener();
}

Bullet.prototype.addListener = function() {
    this.node.on('outOfPlayground', () => this.destroy());
    
    this.node.on('collide', event => {
        var target = event.detail;
        this.destroy();
        
        if (target.type === 'Tank') {
            target.node.emit('beAttack', this);
        }
    });
};

Bullet.prototype.getHalfSize = function() {
    var nodeSprite = this.node.children[0];
    this.component.halfSize = { x: nodeSprite.width / 2, y: nodeSprite.height / 2 };
};

Bullet.prototype.rotate = function(direction) {
    var deg = [0, 90, 180, 270];
    
    this.node.rotation = deg[direction];
};

Bullet.prototype.setMotionState = function(direction) {
    var velocity = [
        { x: 0, y: this.component.speed },
        { x: this.component.speed, y: 0 },
        { x: 0, y: -this.component.speed },
        { x: -this.component.speed, y: 0 },
    ];
    
    this.component.velocity = velocity[direction];
};

Bullet.prototype.appendToPlayground = function(playgroundNode, bulletPosition) {
    var bullet = this.node;
    
    bullet.setPosition(bulletPosition);
    playgroundNode.addChild(bullet);
};

Bullet.prototype.appendToBulletsSet = function() {
    this.key = BulletsSet.push(this);
};

Bullet.prototype.destroy = function() {
    BulletsSet.remove(this.key);
    this.component.destroy();
};

module.exports = Bullet;
