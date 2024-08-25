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

function format_time(unix) {
	// Get current timestamp in seconds
	const now = Math.floor(Date.now() / 1000);

	// Calculate the difference in seconds
	const diffInSeconds = now - unix;

	// Calculate the difference in minutes, hours, and days
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInSeconds / (60 * 60));
	const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

	// Create a Date object from the given UNIX timestamp
	const date = new Date(unix * 1000);

	// Get formatted date (e.g., March 12 2023)
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const formattedDate = date.toLocaleDateString(undefined, options);

	// Determine the appropriate time format
	if (diffInSeconds < 100 * 60) {
		// Less than 100 minutes ago
		return `${diffInMinutes} minutes ago, ${formattedDate}`;
	} else if (diffInSeconds < 70 * 60 * 60) {
		// Less than 70 hours ago
		return `${diffInHours} hours ago, ${formattedDate}`;
	} else {
		// More than 70 hours ago
		return `${diffInDays} days ago, ${formattedDate}`;
	}
}

let loadeddata;

function updateResults(data) {
	loadeddata = data;
	let main = document.getElementById('leaderboards');
	let inner = "<h2 style='text-align: center'>Leaderboards</h2><br>";


	// for (let index = 0; index < data.leaderboards.length; index++) {
	// const element = array[index];

	// }
	inner += '<div class="scrollable-box-container">'
	Object.keys(data.leaderboards).forEach(element => {
		board = data.leaderboards[element];
		content = "<h1 style='text-align: center'>" + element + "</h1>";
		for (let index = 0; index < board.length; index++) {
			const player = board[index];

			_c = ">";
			if (index % 2 == 1) {
				_c = "style='background-color: #FFFFFF12'>";
			}
			_cc = " style='color: #FFFFFF50'";
			if (player["rank"] == 1)
				_cc = " style='color: #FFE39EA0'";
			if (player["rank"] == 2)
				_cc = " style='color: #B5DDDCA0'";
			if (player["rank"] == 3)
				_cc = " style='color: #D3A48FA0'";


			content += "<p class='align-last-word'" + _c + "<span" + _cc + ">#" + player["rank"] + "</span> " + player.name + "<span class='end'>" + player.score + "</span></p>";
		}
		inner += '<div class="scrollable-box">' + content + "</div>"


	});
	inner += "</div>"
	inner += "<br><p style='color: #FFFFFF42; text-align:center;'>Join via <span style='color: #AFFFFF82;'>node.slamga.me:25013</span> on 1.21  |  Last updated " + format_time(data.date) + "</p>";

	// board = data.leaderboards["2 Player Cookscores in The Kitchen:"];

	// let players = data.players;
	// let filteredPlayers = {};

	// for (const player in players) {
	// 	if (Object.values(players[player]).some(value =>
	// 		String(value).toLowerCase().includes(query.toLowerCase()) ||
	// 		player.toLowerCase().includes(query.toLowerCase())
	// 	)) {
	// 		try {
	// 			if (players[player].level >= 1)
	// 				filteredPlayers[player] = players[player];
	// 		} catch { }
	// 	}
	// }

	// const filteredPlayersArray = Object.keys(filteredPlayers).map(player => ({
	// 	name: player,
	// 	...filteredPlayers[player]
	// }));

	// filteredPlayersArray.sort((a, b) => b.level - a.level);

	// max = 200;
	// if (filteredPlayersArray.length > 0) inner = "";
	// for (const i in filteredPlayersArray) {
	// 	max -= 1;
	// 	if (max < 0)
	// 		break;
	// 	let player = filteredPlayersArray[i];
	// 	let uuid = "";
	// 	uuid = uuid.replace("-", "");
	// 	let style = "";
	// 	let playername = player.name;
	// 	if (Object.hasOwn(player, "rank")) {
	// 		style = 'style="background-color: #C4A0FF4d"'
	// 		playername = '<l style="color: #C4A0FF">' + player.rank + " " + "</l>" + playername
	// 	}

	// 	let sub = '<div class="profileheader"' + style + '><img scr="https://api.mineatar.io/face/' + uuid + '?scale=16">' + playername + '</div>';

	// 	sub += "<br>Level: " + player.level;
	// 	sub += "<br>Playtime: " + Math.floor(player.playtime / 60 / 60) + ":" + Math.floor(player.playtime / 60 % 60) + ":" + Math.floor(player.playtime % 60);
	// 	sub += "<br>Unique Kills: " + player.uniquekills;
	// 	sub += "<br>Charms Found: " + player.charms;
	// 	inner += '<article>' + sub + '</article>';
	// }
	main.innerHTML = inner;
}

loadJSON('https://raw.githubusercontent.com/FlagClash/FlagClash.github.io/main/leaderboards.json').then(data => {
	updateResults(data);
});

