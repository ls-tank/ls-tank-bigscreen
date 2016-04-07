function ToastItem(winner, loser) {
    this.winner = winner;
    this.loser = loser;
}

function ToastQueue() {
    var data = [];
    var subers = [];
    
    var push = function(winner, loser) {
        data.push(new ToastItem(winner, loser));
        // todo
    };
    
    var unshift = function(winner, loser) {
        data.unshift(new ToastItem(winner, loser));
    };
    
    var shift = function() {
        if (data.length === 0) return null;
        var item = data.shift();
        
        subers.forEach(callback => callback(item));
        return item;
    };
    
    var sub = function(callback) {
        subers.push(callback);
    };
        
    return {
        push: push,
        unshift: unshift,
        shift: shift,
        sub: sub
    };
}

module.exports = new ToastQueue();