import Swiper, { Pagination, Navigation } from 'swiper'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
const scrollTopSelector = '.scrolltop';

// Game
window.addEventListener('load', () => {
	const iframeSrc = 'https://www.artsteps.com/embed/62826c4b4cf1c4d6b1f6be7d/1280/720';
	const breakpoint = 992;
	const secondsToCloseOutsideViewport = 30;
	const $sectionGame = document.querySelector('.section-game');
	const $toggle = $sectionGame.querySelector('.section-game__toggle');
	const $wrapper = $sectionGame.querySelector('.section-game__wrapper');
	const $iframe = $sectionGame.querySelector('.section-game__iframe')
	let isShown = false;

	function setSrc() {
		if ($iframe.src === iframeSrc) return;
		$iframe.src = iframeSrc;
	}

	function clearSrc() {
		if ($iframe.src !== iframeSrc) return;
		$iframe.src = 'about:blank';
	}

	function showGame() {
		if (isShown) return;
		setSrc();
		$wrapper?.classList.add('show');
		$toggle.textContent = 'Закрыть';
		isShown = true;

		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: $sectionGame.offsetTop - 10
		});
	}

	function hideGame() {
		if (!isShown) return;
		$wrapper?.classList.remove('show');
		$toggle.textContent = 'Запустить здесь';
		isShown = false;
	}

	$toggle?.addEventListener('click', () => {
		isShown ? hideGame() : showGame();
	});

	if (window.innerWidth >= breakpoint) {
		let scrollTimeout = null;
		window.addEventListener('scroll', () => {
			const offset = 500;
			if (
				window.scrollY > $sectionGame.offsetTop - window.innerHeight - offset &&
				window.scrollY < $sectionGame.offsetTop + $sectionGame.clientHeight + offset
			) {
				if (!isShown) setSrc();
				if (scrollTimeout && isShown) {
					clearTimeout(scrollTimeout);
					scrollTimeout = null;
				}
			} else {
				if (!isShown) clearSrc();
				if (!scrollTimeout && isShown) {
					scrollTimeout = setTimeout(() => {
						hideGame();
					}, secondsToCloseOutsideViewport * 1000)
				}
			}
		});
	}
});


window.addEventListener('scroll', () => {
	if (window.scrollY > window.innerHeight) {
		document.querySelector(scrollTopSelector)?.classList.add('active')
	} else {
		document.querySelector(scrollTopSelector)?.classList.remove('active')
	}
})

document.addEventListener('DOMContentLoaded', () => {

	document
		.querySelectorAll('.scroll-link')
		.forEach($link => {
			$link.addEventListener('click', e => {
				e.preventDefault();
				const $el = document.querySelector(e.target.getAttribute('href'));
				window.scroll({
					behavior: 'smooth',
					left: 0,
					top: $el.offsetTop
				});
			});
		});

	document.querySelector(scrollTopSelector)?.addEventListener('click', () => {
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: 0
		});
	})

	new Swiper('.gallery-slider', {
		modules: [Pagination, Navigation],
		loop: true,
		speed: 600,
		slidesPerView: 4,
		slidesPerGroup: 4,
		spaceBetween: 10,
		loopedSlides: 15,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			// when window width is >= 640px
			768: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			992: {
				slidesPerView: 4,
				slidesPerGroup: 4,
			}
		}
	});

	const lightbox = new PhotoSwipeLightbox({
		gallery: '.photoswipe',
		children: 'a',
		pswpModule: () => import('photoswipe')
	});
	lightbox.init();

	document.querySelector('.gallery-slider').addEventListener('click', e => {
		console.log(e.target);
		if (e.target.classList.contains('gallery-poster__title')) {
			e.preventDefault();
			console.log(e.target.getAttribute('href'))
			document.querySelector(e.target.getAttribute('href'))?.click();
		}
	});

});
