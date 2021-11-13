// slider
const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
  navPosition: "bottom"
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

// Catalog item

const tabs = document.querySelectorAll('.catalog__tab');
const contents = document.querySelectorAll('.catalog__content');
const moreInfo = document.querySelectorAll('.catalog-item__link');
const contentItemInfo = document.querySelectorAll('.catalog-item__content ');
const contentItemListInfo = document.querySelectorAll('.catalog-item__list');
const backToContentInfo = document.querySelectorAll('.catalog-item__back');

function removeAllClass(selector) {
  const elem = document.querySelectorAll(selector);
  elem.forEach(item => {
    item.classList.remove(`${selector.replace(/\./, '')}`);
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', (e) => {
    removeAllClass('.catalog__tab_active');

    e.target.parentElement.classList.add('catalog__tab_active');

    removeAllClass('.catalog__content_active');

    contents[i].classList.add('catalog__content_active');
  });
})

moreInfo.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.parentElement.classList.remove('catalog-item__content_active');
    contentItemListInfo[i].classList.add('catalog-item__list_active');
  });
});

backToContentInfo.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    contentItemListInfo[i].classList.remove('catalog-item__list_active');
    contentItemInfo[i].classList.add('catalog-item__content_active');
  });
});

// Modal window
const overlay = document.querySelector('.overlay');
const scroll = calcScroll();

function openModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.style.display = 'block';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = `${scroll}px`;
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.style.display = 'none';
  overlay.style.display = 'none';
  document.body.style.overflow = '';
  document.body.style.marginRight = '0px';
}

function modal(triggerModal, modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  const triggerOpenModal = document.querySelectorAll(triggerModal);
  const triggerClose = document.querySelectorAll('.modal__close');

  triggerOpenModal.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('button_mini')) {
        document.querySelector('#name-product').textContent = document.querySelectorAll('.catalog-item__subtitle')[i].textContent;
      }

      openModal(modalSelector);

    });
  });

  triggerClose.forEach(item => {
    item.addEventListener('click', () => closeModal(modalSelector));
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.style.display !== 'none') {
      closeModal(modalSelector);
    }
  })

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal(modalSelector);
    }
  });

}

// Функиця, которая создаёт отступ справа при вызове модального окна
function calcScroll() {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}

modal('[data-modal="consultation"]', '#consultation');
modal('.button_mini', '#order');

// Валидация форм

function valideForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: 'required',
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите своё имя",
        minlength: jQuery.validator.format("Введите {0} символа!")
      },
      phone: "Пожалуйста, введите свой номер телефона",
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введён адрес почты"
      }
    }
  });
}

valideForms('#consultation-form');
valideForms('#consultation form');
valideForms('#order form');

// Маска ввода номера телефона

$('[name="phone"]').mask("+38 (999) 99-99-999");

