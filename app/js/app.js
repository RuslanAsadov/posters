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

	document.querySelectorAll('.gallery-slider-wrapper')?.forEach($gallerySlider => {
		new Swiper($gallerySlider.querySelector('.gallery-slider'), {
			modules: [Pagination, Navigation],
			loop: true,
			speed: 600,
			simulateTouch: false,
			spaceBetween: 5,
			maxBackfaceHiddenSlides: 0,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true
			},
			navigation: {
				nextEl: $gallerySlider.querySelector('.swiper-button-next'),
				prevEl: $gallerySlider.querySelector('.swiper-button-prev'),
			},
			breakpoints: {
				480: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 5
				},
				1200: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				}
			}
		});
	});

	const $videoSlider = document.querySelector('.video-slider-wrapper');
	new Swiper($videoSlider.querySelector('.video-slider'), {
		modules: [Pagination, Navigation],
		loop: true,
		speed: 600,
		simulateTouch: false,
		maxBackfaceHiddenSlides: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		},
		navigation: {
			nextEl: $videoSlider.querySelector('.swiper-button-next'),
			prevEl: $videoSlider.querySelector('.swiper-button-prev'),
		},
		breakpoints: {
			0: {
				spaceBetween: 15
			},
			480: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			768: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 5
			},
		}
	});

	const lightbox = new PhotoSwipeLightbox({
		gallery: '.photoswipe',
		children: 'a',
		pswpModule: () => import('photoswipe')
	});

	lightbox.init();

	document.querySelectorAll('.gallery-slider').forEach($gallery => {
		$gallery?.addEventListener('click', e => {
			if (e.target.classList.contains('gallery-poster__title')) {
				e.preventDefault();
				document.querySelector(e.target.getAttribute('href'))?.click();
			}
		});
	});


	function getYoutubeIdFromUrl(url) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??(v=)?([^#&?]*).*/;
		var match = url.match(regExp);
		return (match && match[8].length == 11) ? match[8] : false;
	}


	// Videos
	const $videoModal = document.querySelector('.video-modal');
	document.querySelectorAll('.video-link').forEach($link => {
		$link?.addEventListener('click', e => {
			if (window.innerWidth >= 768 && $videoModal) {
				e.preventDefault();
				const videoId = getYoutubeIdFromUrl(e.target.getAttribute('href'));
				$videoModal.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
				$videoModal.classList.add('show');
			}
		});
	});

	$videoModal.addEventListener('click', e => {
		if (!e.target.classList.contains('video-section__container')) {
			$videoModal.classList.add('hiding');
			setTimeout(() => {
				$videoModal.classList.remove('hiding');
				$videoModal.classList.remove('show');
				$videoModal.querySelector('iframe').src = 'about:blank';
			}, 250);
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
