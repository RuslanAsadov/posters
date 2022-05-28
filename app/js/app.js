import Swiper, { Pagination, Navigation } from 'swiper'
import PhotoSwipeLightbox from 'photoswipe/lightbox';

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
					top: $el?.offsetTop
				});
			});
		});

	// Scroll Top
	document.querySelector('.scrolltop')?.addEventListener('click', () => {
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: 0
		});
	});
	window.addEventListener('scroll', () => {
		if (window.scrollY >= window.innerHeight) {
			document.querySelector('.scrolltop')?.classList.add('active')
		} else {
			document.querySelector('.scrolltop')?.classList.remove('active')
		}
	});



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

	document.querySelector('.gallery-slider')?.addEventListener('click', e => {
		if (e.target.classList.contains('gallery-poster__title')) {
			e.preventDefault();
			console.log(e.target.getAttribute('href'))
			document.querySelector(e.target.getAttribute('href'))?.click();
		}
	});

	// Button section about
	const $aboutList = document.querySelector('.about-list');
	document.querySelector('.section-about__button')?.addEventListener('click', (e) => {
		if ($aboutList.classList.contains('about-list--open')) {
			$aboutList.classList.remove('about-list--open');
			e.target.textContent = "Показать полностью";
		} else {
			$aboutList.classList.add('about-list--open');
			e.target.textContent = "Скрыть";
		}
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: e.target.closest('.section-about')?.offsetTop
		});
	});

});
