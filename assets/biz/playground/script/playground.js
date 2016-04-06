var Connect = require('connect');

var Tank = require('tank.class');
var TanksSet = require('tanksSet');

var Bullet = require('bullet.class');
var BulletsSet = require('bulletsSet');

var NodePool = require('nodePool');
var Utils = require('utils');

var PlayersSet = require('playersSet');

cc.Class({
    extends: cc.Component,

    properties: {
        bgs: {
            default: [],
            type: cc.SpriteFrame
        },
        bg: {
            default: null,
            type: cc.Sprite
        },
        tankPrefab: {
            default: null,
            type: cc.Prefab
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        }
    },
    
    createTank: function(data) {
        var tank = new Tank(this.tankPrefab, data, this.node);
        PlayersSet.set(data.uid, tank);
    },
    
    removeTank: function(uid) {
        var tank = TanksSet.get(uid);
        
        tank.destroy();
        TanksSet.remove(uid);
        
    },
    
    changeMotionTank: function(data) {
        var tank = TanksSet.get(data.uid);
        
        tank.changeMotionState(data.data.direction);
        
    },
    
    createBullet: function(data) {
        var tank = TanksSet.get(data.uid);
        
        var options = {
            uid: data.uid,
            direction: tank.component.direction,
            position: tank.getPosition(),
            level: tank.equip.head,
            attack: tank.component.attack
        };
        
        tank.component.fireAction();
        new Bullet(this.bulletPrefab, options, this.node);
        
    },
    
    onReceiveDataServer: function() {
        Connect.on('b-enter', event => this.createTank(event.data));
        Connect.on('b-leave', event => this.removeTank(event.data.uid));
        Connect.on('b-direction', event => this.changeMotionTank(event));
        Connect.on('b-fire', event => this.createBullet(event));
    },
    
    onLoad: function() {
        Connect.connect();
        this.onReceiveDataServer();
    },
    
    update: function() {
        Utils.isImpactInRange(NodePool.get());
    }
});
