var _ = require('lodash');
var utils = require('utils');

var TanksSet = require('tanksSet');
var BuffsSet = require('buffsSet');

var buffs = ['attack', 'def', 'speed', 'hp'];

function Buff(prefab, options, playgroundNode) {
    this.type = 'Buff';
    this.key = '';
    
    this.node = cc.instantiate(prefab);
    this.component = this.node.getComponent('buff');
    
    this.colliderFlag = 4;
    this.colliderFlags = 2;
    
    this.halfSize = { x: 30, y: 30};
    
    Object.defineProperty(this, 'x', {
        get: function() { return this.node.x; }
    });
    
    Object.defineProperty(this, 'y', {
        get: function() { return this.node.y; }
    });
    
    this.component.init(this.randomType());
    
    this.appendToPlayground(playgroundNode, this.getInitPosition());
    this.appendToBuffsSet();
    
    this.addListener();
}

Buff.prototype.addListener = function() {
    this.node.on('collide', event => {
        var _type = buffs[this.buffType];
        var tank = event.detail;
        
        this.component.getBuff();
        tank.showBuff(_type);
        
        this.destroy();
    });
};

Buff.prototype.randomType = function() {
    // this.buffType = 3;
    this.buffType = Math.random() * 4 | 0;
    return this.buffType;
};

Buff.prototype.appendToPlayground = function(playgroundNode, buffPosition) {
    var buffNode = this.node;
    
    buffNode.setPosition(buffPosition);
    playgroundNode.addChild(buffNode);
};

Buff.prototype.appendToBuffsSet = function() {
    this.key = BuffsSet.push(this);
};

Buff.prototype.getInitPosition = function() {
    return utils.createUnoccupiedPosition(_.toArray(TanksSet.getAllPosition()), { width: 1440, height: 1080 });
};

Buff.prototype.destroy = function() {
    BuffsSet.remove(this.key);
    this.component.destroy();
};

module.exports = Buff;


