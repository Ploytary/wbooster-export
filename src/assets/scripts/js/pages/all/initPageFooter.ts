import { findHtmlElement } from '../../helpers/dom';

export function initPageFooter() {
  const buttonElement = findHtmlElement('.page-footer__button');
  buttonElement.addEventListener('click', () => alert('Вызов формы'));
}
