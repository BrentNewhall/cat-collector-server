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
        cats.push( { x: parseInt(Math.random() * 500 + 50), y: parseInt(Math.random() * 500 + 50) } );
    }
}

io.on( "connection", (socket) => {
    players.push( socket );
	const player = players.length;
    console.log( "Player " + players.length + " connected." );
	socket.emit( "player number", players.length );
	for( let index = 0; index < cats.length; index++ ) {
		socket.emit( "place cat", cats[index] );
	}
	socket.on( "collect", (cat, index) => {
		console.log( "Player " + player + " collecting " + cat + " " + index );
		io.emit( "remove cat", cats[index] );
		cats = cats.splice( index, 1 );
	});
	socket.on( 'disconnect', () => {
		players = players.splice(player,1);
		console.log( "Player " + player + " disconnected." );
	});
})
