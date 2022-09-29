$(document).ready(function () {
	$('.head__burger').click(function (event) {
		$('.head__burger,.burger__menu').toggleClass('active');
		$(body).toggleClass('lock');
	});
});
// slider
$(document).ready(function () {
	$('.slider').slick({
		arrows: true,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 1000,
		easing: 'linear',
		infinite: true,
		initialSlide: 0,
		autoplay: false,
		autoplaySpeed: 2000,
		pauseOnFocus: true,
		pauseOnHover: true,
		pauseOnDotsHover: true,
		draggable: true,
		swipe: true, // для тачскринов мобайл планшет скролить меню
		touchThreshold: 8, // момент усилия пальцем листая, 5 по умолчанию 
		touchMove: false, // при усилии пальцем лента не тянется а фикс передвигает ленту
		waitForAnimate: true, // при значении false нажимая на стрелочки лента будет листать быстро
		centerMode: false,
		variableWidth: false, // убирает все промежутки между картинками
		rows: 1, // ряды 1 по умолчанию
		slidesPerRow: 1, // по умолчанию один сочитать с rows кол-во отображаемых картинок 
		vertical: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					arrows: false,
					slidesToShow: 1,
					mobileFirst: true
				}
			}
		],
		mobileFirst: false
	});
	// slider2
	$('.slidercola').slick({
		arrows: true,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 1000,
		easing: 'linear',
		infinite: true,
		initialSlide: 0,
		autoplay: false, // авто прокуртка
		autoplaySpeed: 2000,
		pauseOnFocus: true,
		pauseOnHover: true,
		pauseOnDotsHover: true,
		draggable: true, // что листать ленту пальцем
		swipe: true, // для тачскринов мобайл планшет скролить меню
		touchThreshold: 8, // момент усилия пальцем листая, 5 по умолчанию 
		touchMove: false, // при усилии пальцем лента не тянется а фикс передвигает ленту
		waitForAnimate: true, // при значении false нажимая на стрелочки лента будет листать быстро
		centerMode: false,
		variableWidth: false, // убирает все промежутки между картинками
		rows: 1, // ряды 1 по умолчанию
		slidesPerRow: 1, // по умолчанию один сочитать с rows кол-во отображаемых картинок 
		vertical: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					arrows: false,
					slidesToShow: 1,
					mobileFirst: true
				}
			}
		],
		mobileFirst: false,
	});
});

// popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnLock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnLock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.conteiner__wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();