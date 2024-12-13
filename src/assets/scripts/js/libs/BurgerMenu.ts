import { findHtmlElement } from '../helpers/dom';

export interface BurgerMenuParams {
  containerClass?: string;
  menuClass?: string;
  togglerButtonClass?: string;
  openedClass?: string;
  closeButtonClass?: string;
  backdropClass?: string;
  closeBreakpoint: number;
}

export interface EventCallback {
  (instance: BurgerMenu): void;
}

const defaultParams: Required<BurgerMenuParams> = {
  containerClass: 'burger-menu',
  menuClass: 'burger-menu__menu',
  togglerButtonClass: 'burger-menu__toggler',
  openedClass: 'burger-menu__content--open',
  closeButtonClass: 'burger-menu__content-close-button',
  backdropClass: 'burger-menu__backdrop',
  closeBreakpoint: 768,
};

export class BurgerMenu {
  private params: Required<BurgerMenuParams>;
  public containerElement: HTMLElement;
  public togglerButtonElement: HTMLElement;
  public closeButtonElement: HTMLElement | null = null;
  public backdropElement: HTMLElement;
  private itemElements: HTMLElement[] = [];
  private isOpen: boolean = false;
  private handleTogglerClick = this.togglerButtonClickEventHandler.bind(this);
  private handleOutClick = this.outerClickHandler.bind(this);
  private handleCloseButtonClick = this.close.bind(this);
  private onInitHandler: EventCallback | null = null;
  private onOpenHandler: EventCallback | null = null;
  private onCloseHandler: EventCallback | null = null;

  constructor(
    selector: string | HTMLElement,
    customParams?: Partial<BurgerMenuParams>,
    onInitHandler: EventCallback | null = null
  ) {
    this.params = Object.assign({}, defaultParams, customParams);
    this.onInitHandler = onInitHandler;

    if (selector instanceof HTMLElement) {
      this.containerElement = selector;
    } else {
      this.containerElement = findHtmlElement(selector);
    }

    this.togglerButtonElement = findHtmlElement(`.${this.params.togglerButtonClass}`);
    this.closeButtonElement = findHtmlElement(`.${this.params.closeButtonClass}`);
    const menuElement = findHtmlElement(`.${this.params.menuClass}`);
    this.itemElements = Array.from(menuElement.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement
    );

    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add(this.params.backdropClass);
    this.backdropElement.style.visibility = 'hidden';

    document.body.append(this.backdropElement);
    this.addEvents();
    this.onInitHandler && this.onInitHandler(this);
    this.setWindowSizeObserver();
  }

  private setWindowSizeObserver() {
    const sizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width >= this.params.closeBreakpoint) {
          this.close();
        }
      }
    });
    sizeObserver.observe(document.body);
  }

  public close(): void {
    if (!this.isOpen) return;
    this.switchOpenState(false);
    this.backdropElement.style.visibility = 'hidden';
    document.documentElement.style.overflow = 'visible';
    this.onCloseHandler && this.onCloseHandler(this);
  }

  public open(): void {
    if (this.isOpen) return;
    this.switchOpenState(true);
    this.backdropElement.style.visibility = 'visible';
    document.documentElement.style.overflow = 'hidden';
    this.onOpenHandler && this.onOpenHandler(this);
  }

  public destroy(): void {
    this.backdropElement.remove();
    this.removeEvents();
  }

  public onInit(callback: EventCallback) {
    this.onInitHandler = callback;
  }

  public onOpen(callback: EventCallback) {
    this.onOpenHandler = callback;
  }

  public onClose(callback: EventCallback) {
    this.onCloseHandler = callback;
  }

  private switchOpenState(predicate: boolean): void {
    this.isOpen = predicate;
    this.containerElement.classList.toggle(this.params.openedClass, this.isOpen);
  }

  private addEvents(): void {
    this.togglerButtonElement.addEventListener('click', this.handleTogglerClick);
    document.addEventListener('click', this.handleOutClick);
    this.closeButtonElement?.addEventListener('click', this.handleCloseButtonClick);
    this.itemElements.forEach((element) => {
      element.addEventListener('click', () => this.close());
    });
  }

  private removeEvents(): void {
    this.togglerButtonElement.removeEventListener('click', this.handleTogglerClick);
    document.removeEventListener('click', this.handleOutClick);
    this.closeButtonElement?.removeEventListener('click', this.handleCloseButtonClick);
  }

  private togglerButtonClickEventHandler(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private outerClickHandler(evt: Event): void {
    if (evt.target === this.backdropElement) {
      this.close();
    }
  }
}
