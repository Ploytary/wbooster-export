import { findHtmlElement } from '../../helpers/dom';
import { BurgerMenu, BurgerMenuParams } from '../../libs/BurgerMenu';

export function initPageHeader() {
  const pageHeader = findHtmlElement('.page-header');
  window.addEventListener(
    'scroll',
    () => {
      pageHeader.classList.toggle('page-header--scrolled', window.scrollY > 0);
    },
    { passive: true }
  );

  shiftLayoutByMenuHeight(pageHeader);
  initBurgerMenu();
}

function shiftLayoutByMenuHeight(pageHeader: HTMLElement) {
  const firstContentBlock = findHtmlElement('main > section:first-of-type');
  const initTopPadding = parseInt(getComputedStyle(firstContentBlock).paddingTop);
  const fitFirstBlock = () => {
    const additionPadding = pageHeader.clientHeight;
    firstContentBlock.style.paddingTop = `${initTopPadding + additionPadding}px`;
  };
  const mutObserver = new MutationObserver(fitFirstBlock);
  mutObserver.observe(pageHeader, {
    childList: true,
    subtree: true,
  });
  const resizeObserver = new ResizeObserver(fitFirstBlock);
  resizeObserver.observe(pageHeader);
}

function initBurgerMenu() {
  const mediumBreakpoint = parseInt(
    window.getComputedStyle(document.documentElement).getPropertyValue('--layout-breakpoint-medium') || '870'
  );
  const params: Required<BurgerMenuParams> = {
    containerClass: 'burger-menu',
    menuClass: 'burger-menu__menu',
    togglerButtonClass: 'page-header__burger-menu-button',
    openedClass: 'burger-menu--open',
    closeButtonClass: 'burger-menu__close-button',
    backdropClass: 'burger-menu__backdrop',
    closeBreakpoint: mediumBreakpoint,
  };

  new BurgerMenu('.burger-menu', params);
}
