import { findHtmlElement } from '../../helpers/dom';
import { ZigzagArrowList } from '../../libs/ZigzagArrowList';

export function initStepsSection() {
  const options = {
    itemsMinWidth: 380,
    columnGap: 20,
    rowGap: 30,
    direction: 'forward',
  } as const;

  const listElement = findHtmlElement('.arrow-list');
  new ZigzagArrowList(listElement, options);

  const button = findHtmlElement('.steps-section__action-button');
  button.addEventListener('click', () => alert('Вызов формы'));
}
