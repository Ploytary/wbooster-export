export function findHtmlElement(selector: string, place: Element | Document = document): HTMLElement {
  const element = findElement(selector, place);
  if (element instanceof HTMLElement) {
    return element;
  }
  throw new Error(
    `the element found with selector "${selector}" with type ${element.constructor.name} is not an instance of HTMLelement`
  );
}

export function findHtmlElements(selector: string, place: Element | Document = document): HTMLElement[] {
  const elements = findElements(selector, place);
  if (isHtmlElements(elements)) return elements;
  throw new Error(`the elements found with selector "${selector}" is not an instance of HTMLelement`);
}

function findElement(selector: string, place: Element | Document = document): Element {
  const element = place.querySelector(selector);
  if (!element) throw Error(`element ${selector} does not exist`);
  return element;
}

function findElements(selector: string, place: Element | Document = document): Element[] {
  const elements = Array.from(place.querySelectorAll(selector));
  if (!elements.length) throw Error(`elements ${selector} does not exist`);
  return elements;
}

export function isHtmlElement(element: Element | EventTarget | null): element is HTMLElement {
  return element instanceof HTMLElement;
}

function isHtmlElements(elements: Element[]): elements is HTMLElement[] {
  return elements.every((element) => isHtmlElement(element));
}
