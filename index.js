/*
 * This is the server for a multiplayer Cat Collector game.
 */

const io = require('socket.io')();

let cats = [];
let players = [];
init();

const port = 1337;
io.listen(port);
console.log( "Listening on port " + port );

function init() {
    for( let index = 0; index < 5; index++ ) {
        cats.push( { x: Math.random() * 500, y: Math.random() * 500 } );
    }
}

io.on( "connection", (socket) => {
    players.push( socket );
	const player = players.length;
    console.log( "Player " + players.length + " connected." );
	socket.on( 'disconnect', () => {
		players = players.splice(player,1);
		console.log( "Player " + player + " disconnected." );
	});
})
