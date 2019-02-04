var sunucu = app.listen('3000');
var io = require('socket.io').listen(sunucu);
var yol = require('path');
var shortid = require('shortid');

  var playerCount = 0;
io.on('connection',function(socket){
	var thisClientId = shortid.generate();
	socket.broadcast.emit('spawn',{id:thisClientId});
	playerCount++;
	console.log("Bağlantı Sağlandı, Oyuncu sayısı = ",playerCount);
	for(i = 0; i < playerCount; i++)
	{
		socket.emit('spawn',{id:thisClientId});
		console.log(thisClientId," Oyuncusu Spawnlandı");
	}

	socket.on('move',function(data){
		socket.emit('FirstMove',data);
	});
	socket.on('spawn',function(data){
		console.log("Oyuncu Spawnlanıyor");
	});

	socket.on('disconnect',function(data){
		console.log("oyuncu oyundan çıktı");
		playerCount--;
	});

});
console.log("Sunucu Aktif");
