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

