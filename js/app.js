// preloader start
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");

  setTimeout(() => {
    preloader.style.display = "none";
  }, 100);
});

// preloader end

// check webp start
function testWebP(callback) {
  let webP = new Image();
  webP.onload = function () {
    callback(webP.complete && webP.height === 2);
  };
  webP.onerror = function () {
    callback(false);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Добавляем класс _webp или _no-webp в HTML
document.addEventListener("DOMContentLoaded", function () {
  testWebP(function (support) {
    document.documentElement.classList.add(support ? "webp" : "no-webp");
  });
});
// check webp end
const body = document.querySelector('body')

// menu animated underline start
function setupNavAnimation(nav) {
  const links = [...nav.querySelectorAll("a")];
  const underline = nav.querySelector(".underline");

  // Внешняя переменная для хранения текущего индекса
  let currentIndex = 0;

  function updateUnderline(index) {
    const link = links[index];
    if (!link) return;

    const { offsetLeft: left, offsetWidth: width } = link;
    underline.style.setProperty("--left", `${left}px`);
    underline.style.setProperty("--width", `${width}px`);
    underline.style.opacity = 1;

    currentIndex = index; // Сохраняем индекс
  }

  if (!underline) return;

  links.forEach((link, index) => {
    link.addEventListener("mouseenter", () => updateUnderline(index));
  });

  nav.addEventListener("mouseleave", () => {
    underline.style.opacity = 0;
  });

  // Добавляем обработчик resize
  window.addEventListener("resize", () => updateUnderline(currentIndex));
}

// Вызываем для всех nav с классом .nav-animated
document.querySelectorAll(".nav-animated").forEach(setupNavAnimation);

//  menu animated underline end

// mob-menu start
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__mob-wrapper");
const header = document.querySelector(".header");
const mobLinks = document.querySelectorAll(".mob-nav__list a");

if (burger) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    body.classList.toggle("lock");
  });
}

menu.addEventListener("click", (e) => {
  if (e.target === menu) {
    burger.classList.remove("active");
    menu.classList.remove("active");
    body.classList.contains("lock") ? body.classList.remove("lock") : false;
  }
});

if (mobLinks.length > 0) {
  mobLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("active");
      body.classList.contains("lock") ? body.classList.remove("lock") : false;
    });
  });
}
  
// mob-menu end

// swiper start

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const swiper = new Swiper(".slider-letters", {
  modules: [Pagination],
  slidesPerView: "auto",
  spaceBetween: 24,
  freeMode: true,
  watchSlidesProgress: true,
  allowTouchMove: true,
  watchOverflow: true,
  cssMode: false,

  breakpoints: {
    642: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1.5,
    },
  },

  pagination: {
    el: ".slider-letters__pagination",
    clickable: true,
  },
});

// swiper end

// popup start

const popup = document.getElementById('callback');
const openBtns = document.querySelectorAll('[data-callback="callback"]');
const closeBtn = document.getElementById('closePopup');

openBtns.forEach((openBtn) => {
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('active');
    if (menu.classList.contains('active')) {
      burger.classList.remove('active');
      menu.classList.remove('active');
    }
    !body.classList.contains("lock") ? body.classList.toggle("lock") : false;
  })
})

// Закрытие по кнопке
closeBtn.addEventListener('click', () => {
  popup.classList.remove('active');
  body.classList.contains("lock") ? body.classList.remove("lock") : false;
});

// Закрытие по клику вне формы
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('active');
    body.classList.contains("lock") ? body.classList.remove("lock") : false;
  }
});

// popup end
// mob-vidjet start
const mobVidjet = document.querySelector(".mob-vidjet");
const movVidjetBtn = mobVidjet.querySelector(".mob-vidjet__btn");

movVidjetBtn.addEventListener('click', () => {
  mobVidjet.classList.toggle('active')
})

document.addEventListener("click", (e) => {
  if (!mobVidjet.contains(e.target)) {
    mobVidjet.classList.remove("active");
  }
});
// mob-vidjet end
// header padding-top start
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll); // <-- вызываем при загрузке

function handleScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  const scrollTop = window.scrollY;

  if (scrollTop > 50) {
    header.classList.add("active_bg");
    header.style.paddingTop = "5px";
    header.style.paddingBottom = "5px";
  } else {
    header.classList.remove("active_bg");
    if (window.innerWidth >= 1270) {
      header.style.paddingTop = "48px";
      header.style.paddingBottom = "48px";
    } else if (window.innerWidth >= 993) {
      header.style.paddingTop = "20px";
      header.style.paddingBottom = "20px";
    } else {
      header.style.paddingTop = "10px";
      header.style.paddingBottom = "10px";
    }
  }
}
// header padding-top end

// modal gallery start
// modal gallery start
let modalSwiper = new Swiper(".modal-swiper", {
  modules: [Navigation],
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Пример кастомных иконок
  on: {
    init: function () {
      this.navigation.prevEl.innerHTML = "❮";
      this.navigation.nextEl.innerHTML = "❯";
    },
  },
});

// Функция открытия галереи с конкретным изображением
function openGallery(index) {
  const modal = document.getElementById('galleryModal');
  const wrapper = modal.querySelector('.swiper-wrapper');

  // Удаляем старые слайды
  wrapper.innerHTML = '';

  // Получаем все изображения из оригинальной галереи
  const images = document.querySelectorAll('.section-gallery__item-photo .gallery-img img');

  // Заполняем слайды новыми
  images.forEach(img => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const imgCopy = document.createElement('img');
    imgCopy.src = img.src;
    imgCopy.alt = img.alt;

    slide.appendChild(imgCopy);
    wrapper.appendChild(slide);
  });

  // Обновляем слайдер
  modalSwiper.update();

  // Открываем на нужный слайд
  modalSwiper.slideToLoop(index, 0);

  // Показываем модалку
  modal.style.display = 'block';
}

// Закрытие галереи
function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

// Назначаем обработчики клика всем изображениям
  const images = document.querySelectorAll('.section-gallery__item-photo .gallery-img img');

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      openGallery(index);
    });
  });

  // Добавляем обработчики для закрытия:
  
    const modal = document.getElementById('galleryModal');
  
  if (modal) {
    // Закрытие по кнопке
    const closeBtn = modal.querySelector('.modal-gallery__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeGallery);
    }
  }
  // Закрытие по клику вне слайда
  modal.addEventListener("click", function (e) {
    // Если клик НЕ по изображению и НЕ по кнопке закрытия — закрываем
    if (
      !e.target.closest(".swiper-slide img") &&
      !e.target.closest(".modal-gallery__close") &&
      !e.target.closest(".swiper-button-prev") &&
      !e.target.closest(".swiper-button-next")
    ) {
      closeGallery();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeGallery();
    }
  });
// modal gallery end

