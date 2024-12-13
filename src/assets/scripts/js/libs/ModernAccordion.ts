import { findHtmlElement, findHtmlElements } from '../helpers/dom';

export interface AccordionClassParams {
  slotClass: string;
  slotOpenClass: string;
  slotOpenedClass: string;
  slotCloseClass: string;
  slotClosedClass: string;
  summaryClass: string;
  triggerClass: string;
  iconClass: string;
}

const defaultParams: AccordionClassParams = {
  slotClass: 'accordion__slot',
  slotOpenClass: 'accordion__slot--open',
  slotOpenedClass: 'accordion__slot--opened',
  slotCloseClass: 'accordion__slot--close',
  slotClosedClass: 'accordion__slot--closed',
  summaryClass: 'accordion__summary',
  triggerClass: 'accordion__trigger',
  iconClass: 'accordion__icon',
};

export interface AccordionOptions {
  classParams?: AccordionClassParams;
  multiOpen?: boolean;
  defaultOpenSlotIndex?: number | false;
  init?: boolean;
}

interface AccordionSlot {
  containerElement: HTMLElement;
  triggerElement: HTMLElement;
  iconElement: HTMLElement;
  isOpen: boolean;
}

export interface AccordionEventHandler {
  (slot: AccordionSlot): void;
}

export interface AccordionInitHandler {
  (instance: ModernAccordion): void;
}

export class ModernAccordion {
  private rootElement: HTMLElement;
  private _slots: AccordionSlot[] = [];
  private classParams: AccordionClassParams = Object.assign({}, defaultParams);
  private options: AccordionOptions;
  private isInitialized: boolean = false;
  private closeHandler: AccordionEventHandler | null = null;
  private openHandler: AccordionEventHandler | null = null;
  private initHandler: AccordionInitHandler | null = null;

  constructor(container: string | HTMLElement, options: AccordionOptions = {}) {
    this.options = options;
    if (typeof container === 'string') {
      this.rootElement = findHtmlElement(container);
    } else {
      this.rootElement = container;
    }

    const { init = true } = this.options;
    init && this.init();
  }

  public get slots(): AccordionSlot[] {
    if (this.isInitialized) {
      return this._slots;
    } else {
      throw new Error('Accordion is not initialized');
    }
  }

  public init(): void {
    this.destroy();

    const { classParams, defaultOpenSlotIndex = 0 } = this.options;
    classParams && Object.assign(this.classParams, classParams);

    this._slots = this.getSlots();
    this.addEvents();
    typeof defaultOpenSlotIndex === 'number' && this.openSlot(defaultOpenSlotIndex);
    this.isInitialized = true;

    this.initHandler && this.initHandler(this);
  }

  public destroy(): void {
    this.removeEvents();
    this._slots = [];
    this.isInitialized = false;
  }

  public onOpen(handler: AccordionEventHandler): void {
    this.openHandler = handler;
  }

  public onClose(handler: AccordionEventHandler): void {
    this.closeHandler = handler;
  }

  public onInit(handler: (instance: ModernAccordion) => void): void {
    this.initHandler = handler;
  }

  private getSlots(): AccordionSlot[] {
    return findHtmlElements(`.${this.classParams.slotClass}`, this.rootElement).map((item) => {
      const triggerElement = findHtmlElement(`.${this.classParams.triggerClass}`, item);
      const iconElement = findHtmlElement(`.${this.classParams.iconClass}`, item);
      const slot = {
        containerElement: item,
        triggerElement,
        iconElement,
        isOpen: false,
      };
      slot.containerElement.classList.toggle(this.classParams.slotOpenedClass, slot.isOpen);
      slot.containerElement.classList.toggle(this.classParams.slotClosedClass, !slot.isOpen);
      return slot;
    });
  }

  private addEvents(): void {
    this._slots.forEach((slot, index) => {
      slot.containerElement.addEventListener('click', (evt) => {
        const target = evt.target;
        if (!(target instanceof Element)) return;
        const isSummary = target.closest('.' + this.classParams.summaryClass);

        if (isSummary) {
          if (slot.isOpen) {
            this.closeSlot(index);
          } else {
            this.openSlot(index);
          }
        }
      });

      slot.containerElement.addEventListener('transitionend', () => {
        slot.containerElement.classList.toggle(this.classParams.slotOpenedClass, slot.isOpen);
        slot.containerElement.classList.toggle(this.classParams.slotClosedClass, !slot.isOpen);
        slot.containerElement.classList.remove(this.classParams.slotOpenClass);
        slot.containerElement.classList.remove(this.classParams.slotCloseClass);
      });
    });
  }

  private removeEvents(): void {
    this._slots.forEach((slot) => {
      const clone = slot.containerElement.cloneNode(true);
      this.rootElement.replaceChild(clone, slot.containerElement);
    });
  }

  private openSlot(index: number): void {
    const slot = this._slots[index];
    if (slot.isOpen) return;
    slot.isOpen = true;
    slot.containerElement.classList.toggle(this.classParams.slotOpenClass, slot.isOpen);
    slot.containerElement.classList.toggle(this.classParams.slotCloseClass, !slot.isOpen);
    slot.containerElement.classList.remove(this.classParams.slotClosedClass);
    this.openHandler && this.openHandler(slot);

    if (!this.options.multiOpen) {
      this._slots.forEach((slot, indexToClose) => {
        indexToClose !== index && this.closeSlot(indexToClose);
      });
    }
  }

  private closeSlot(index: number): void {
    const slot = this._slots[index];
    if (slot.isOpen === false) return;
    slot.isOpen = false;
    slot.containerElement.classList.toggle(this.classParams.slotOpenClass, slot.isOpen);
    slot.containerElement.classList.toggle(this.classParams.slotCloseClass, !slot.isOpen);
    slot.containerElement.classList.remove(this.classParams.slotOpenedClass);
    this.closeHandler && this.closeHandler(slot);
  }
}
