// HEADER SCROLL
const header = document.querySelector('[data-header]');
const activeClass = 'active';

const scrollHeader = () => {
  const scrollY = window.scrollY;
  if (scrollY >= 100) header.classList.add(activeClass);
  else header.classList.remove(activeClass);
};

const addEventOnScrollHeader = () => {
  window.addEventListener('scroll', scrollHeader);
};

addEventOnScrollHeader();

// SMOOTH WINDOW
const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

const getMenuHeight = () => {
  const menu = document.querySelector('.header');
  const menuDimensions = menu.getBoundingClientRect();
  return menuDimensions.height;
};

const getTopFromElement = (event) => {
  const element = event.currentTarget;
  const id = element.getAttribute('href');
  const to = document.querySelector(id).offsetTop;
  const menuHeight = getMenuHeight();
  return to - menuHeight;
}

const scrollToPosition = (to) => {
  smoothScrollTo(0, to);
};

const scrollTo = (event) => {
  event.preventDefault();
  const topItem = getTopFromElement(event);
  scrollToPosition(topItem);
};

const addSmoothScrollEvent = () => {
  internalLinks.forEach((link) => link.addEventListener('click', scrollTo));
};

/*
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

addSmoothScrollEvent();

// RESPONSIVE MENU
const btnMobile = document.querySelector('[data-mobile-button]');
const menu = document.querySelector('[data-menu]');
const html = document.documentElement;

const openMenu = () => {
  menu.classList.add(activeClass);
  btnMobile.classList.add(activeClass);
  setTimeout(() => html.addEventListener('click', closeMenu));
};

const closeMenu = () => {
  menu.classList.remove(activeClass);
  btnMobile.classList.remove(activeClass);
  setTimeout(() => html.removeEventListener('click', closeMenu));
};

const addMenuEvent = () => {
  btnMobile.addEventListener('click', openMenu);
};

addMenuEvent();