document.addEventListener('DOMContentLoaded', function () {
	const toggleBtn = document.getElementById('toggleBtn');
	const leftBar = document.getElementById('leftBar');
	const content = document.getElementById('content');

	toggleBtn.addEventListener('click', function () {
		leftBar.classList.toggle('folded');
	});
	const openableDivs = document.querySelectorAll('.openable');

	openableDivs.forEach(openable => {
		const button = openable.querySelector('.toggle-button');
		const scrollContainer = openable.querySelector('.scroll-container');
		button.innerHTML = "▶" + button.innerHTML
		button.addEventListener('click', () => {
			if (scrollContainer.style.display === 'none' || scrollContainer.style.display === '') {
				scrollContainer.style.display = 'block';
				button.innerHTML = button.innerHTML.replace("▶", "▼")
			} else {
				scrollContainer.style.display = 'none';
				button.innerHTML = button.innerHTML.replace("▼", "▶")
			}
		});
	});
});