var sio = require('socket.io');

var Connect = (function() {
    var URI = '127.0.0.1:3000/bigScreen';
    var UID = 'BIG_SCREEN';
    
    var ws;
    
    var connect = () => ws = sio(URI + '?uid=' + UID);
    
    
    var disconnect = () => ws.disconnect();
    
    var on = (eventName, callback) => ws.on(eventName, callback);
    
    var emit = (eventName, eventObj) => ws.emit(eventName, { uid: UID, data: eventObj });
    
    return {
        connect: connect,
        disconnect: disconnect,
        on: on,
        emit: emit
    }
})();

module.exports = Connect;