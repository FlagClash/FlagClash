// Function to load a JSON file
async function loadJSON(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error loading JSON file:', error);
	}
}

function updateResults(query, data) {
	let main = document.getElementById('live');
	let inner = "Nothing Found";
	let players = data.players;
	let filteredPlayers = {};

	for (const player in players) {
		if (Object.values(players[player]).some(value =>
			String(value).toLowerCase().includes(query.toLowerCase()) ||
			player.toLowerCase().includes(query.toLowerCase())
		)) {
			try {
				if (players[player].level >= 1)
					filteredPlayers[player] = players[player];
			} catch { }
		}
	}

	const filteredPlayersArray = Object.keys(filteredPlayers).map(player => ({
		name: player,
		...filteredPlayers[player]
	}));

	filteredPlayersArray.sort((a, b) => b.level - a.level);

	max = 200;
	if (filteredPlayersArray.length > 0) inner = "";
	for (const i in filteredPlayersArray) {
		max -= 1;
		if (max < 0)
			break;
		let player = filteredPlayersArray[i];
		let uuid = "";
		uuid = uuid.replace("-", "");
		let style = "";
		let playername = player.name;
		if (Object.hasOwn(player, "rank")) {
			style = 'style="background-color: #C4A0FF4d"'
			playername = '<l style="color: #C4A0FF">' + player.rank + " " + "</l>" + playername
		}

		let sub = '<div class="profileheader"' + style + '><img scr="https://api.mineatar.io/face/' + uuid + '?scale=16">' + playername + '</div>';

		sub += "<br>Level: " + player.level;
		sub += "<br>Playtime: " + Math.floor(player.playtime / 60 / 60) + ":" + Math.floor(player.playtime / 60 % 60) + ":" + Math.floor(player.playtime % 60);
		sub += "<br>Unique Kills: " + player.uniquekills;
		sub += "<br>Charms Found: " + player.charms;
		inner += '<article>' + sub + '</article>';
	}
	main.innerHTML = inner;
}

loadJSON('https://raw.githubusercontent.com/FlagClash/FlagClash.github.io/main/data.json').then(data => {
	let main = document.getElementById("live");
	document.getElementById('search-box').addEventListener('input', function () {
		const query = this.value;
		updateResults(query, data);
	});
	updateResults("", data);
});

