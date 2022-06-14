let generateKey= function(param) {
    var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
     chars = param+1,
     segments = param,
     keyString = "";
    
    for( var i = 0; i < segments; i++ ) {
     var segment = "";
    
     for( var j = 0; j < chars; j++ ) {
         var k = Math.floor( Math.random() * ( 35 - 0 + 1 ) ) + 0;;
    
       segment += tokens[ k ];
     }
    
     keyString += segment;
    
     if( i < ( segments - 1 ) ) {
       keyString += "";
     }
    }
    
    return keyString;
    }
    
    module.exports = generateKey