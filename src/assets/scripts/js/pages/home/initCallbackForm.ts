import { findHtmlElement } from '../../helpers/dom';
import IMask from 'imask';

export function initCallbackForm() {
  const element = findHtmlElement('[name="user-phone"]');
  const maskOptions = {
    mask: '+{7}(000)000-00-00',
  };
  IMask(element, maskOptions);

  const form = findHtmlElement('.form-callback') as HTMLFormElement;
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    alert('Отправка формы');
  });
}
