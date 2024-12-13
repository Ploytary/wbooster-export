import { findHtmlElement } from '../helpers/dom';

interface ZigzagArrowListOptions {
  itemsMinWidth: number;
  columnGap: number;
  rowGap: number;
  direction: 'forward' | 'backward';
  classNames: {
    list: string;
    item: string;
    itemArrowRightOut: string;
    itemArrowLeftOut: string;
    itemArrowRightIn: string;
    itemArrowLeftIn: string;
    itemArrowBottomOut: string;
    itemArrowBottomIn: string;
    itemArrowBottomOutRightIn: string;
    itemArrowBottomOutLeftIn: string;
    itemArrowBottomInLeftOut: string;
    itemArrowBottomInRightOut: string;
  };
}

interface OrderQueueVariant {
  direction: ZigzagArrowListOptions['direction'];
  orderList: number[];
}

const defaultOptions: ZigzagArrowListOptions = {
  itemsMinWidth: 240,
  columnGap: 8,
  rowGap: 12,
  direction: 'backward',
  classNames: {
    list: 'arrow-list',
    item: 'arrow-list__item',
    itemArrowRightOut: 'arrow-list__item--to-right-out',
    itemArrowLeftOut: 'arrow-list__item--to-left-out',
    itemArrowRightIn: 'arrow-list__item--to-right-in',
    itemArrowLeftIn: 'arrow-list__item--to-left-in',
    itemArrowBottomOut: 'arrow-list__item--to-bottom-out',
    itemArrowBottomIn: 'arrow-list__item--to-bottom-in',
    itemArrowBottomOutRightIn: 'arrow-list__item--to-bottom-out-to-right-in',
    itemArrowBottomOutLeftIn: 'arrow-list__item--to-bottom-out-to-left-in',
    itemArrowBottomInLeftOut: 'arrow-list__item--to-bottom-in-to-left-out',
    itemArrowBottomInRightOut: 'arrow-list__item--to-bottom-in-to-right-out',
  },
};

export class ZigzagArrowList {
  listElement: HTMLElement;
  options: ZigzagArrowListOptions;
  columnCount: number | null = null;
  items: HTMLElement[];

  constructor(listElement?: HTMLElement, options?: Partial<ZigzagArrowListOptions>) {
    this.options = { ...defaultOptions, ...options };
    const container = listElement ?? findHtmlElement(this.options.classNames.list);
    this.listElement = container;
    this.items = this.getListItems();
    if (this.items.length === 0) return;
    this.addEvents();
  }

  private setLayout(items: HTMLElement[], columnCount: number): void {
    const listMatrix = this.getListMartix(columnCount, items);
    const cellOrderList = new Array(columnCount).fill(null).map((value, index) => index + 1);
    const cellOrderListReverse = cellOrderList.slice().reverse();
    const orderQueue: { direction: ZigzagArrowListOptions['direction']; orderList: number[] }[] = [
      { direction: 'forward', orderList: cellOrderList },
      { direction: 'backward', orderList: cellOrderListReverse },
    ];
    const orderQueueVariants = this.options.direction === 'forward' ? orderQueue : orderQueue.slice().reverse();

    if (columnCount > 1) {
      this.calcMultipleColumnLayout(listMatrix, orderQueueVariants);
    } else {
      this.calcSingleColumnLayout(listMatrix, orderQueueVariants);
    }

    this.listElement.style.display = `grid`;
    this.listElement.style.columnGap = this.options.columnGap + 'px';
    this.listElement.style.rowGap = this.options.rowGap + 'px';
    this.listElement.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
  }

  private calcMultipleColumnLayout(listMatrix: HTMLElement[][], orderQueueVariants: OrderQueueVariant[]) {
    listMatrix.forEach((row, rowIndex) => {
      const currentCellOrder = orderQueueVariants[rowIndex % orderQueueVariants.length];
      row.forEach((cell, cellIndex) => {
        cell.style.gridColumn = String(currentCellOrder.orderList[cellIndex]);
        cell.style.gridRow = String(rowIndex + 1);

        const isFirstItemInRow = cellIndex === 0;
        const isLastItemInRow = cellIndex === row.length - 1;
        const hasNextSiblingCell = Boolean(row[cellIndex + 1]);
        const hasPrevSiblingCell = Boolean(row[cellIndex - 1]);
        const hasNextSiblingRow = Array.isArray(listMatrix[rowIndex + 1]);
        const hasPrevSiblingRow = Array.isArray(listMatrix[rowIndex - 1]);

        cell.className = this.options.classNames.item;
        switch (true) {
          case isFirstItemInRow && hasPrevSiblingRow: {
            if (hasNextSiblingCell) {
              currentCellOrder.direction === 'forward' &&
                cell.classList.add(this.options.classNames.itemArrowBottomInRightOut);
              currentCellOrder.direction === 'backward' &&
                cell.classList.add(this.options.classNames.itemArrowBottomInLeftOut);
            } else {
              currentCellOrder.direction === 'forward' && cell.classList.add(this.options.classNames.itemArrowBottomIn);
              currentCellOrder.direction === 'backward' &&
                cell.classList.add(this.options.classNames.itemArrowBottomIn);
            }
            break;
          }
          case isLastItemInRow && hasNextSiblingRow: {
            currentCellOrder.direction === 'forward' &&
              cell.classList.add(this.options.classNames.itemArrowBottomOutRightIn);
            currentCellOrder.direction === 'backward' &&
              cell.classList.add(this.options.classNames.itemArrowBottomOutLeftIn);
            break;
          }
          case hasNextSiblingCell && hasPrevSiblingCell: {
            currentCellOrder.direction === 'forward' &&
              cell.classList.add(this.options.classNames.itemArrowRightIn, this.options.classNames.itemArrowRightOut);
            currentCellOrder.direction === 'backward' &&
              cell.classList.add(this.options.classNames.itemArrowLeftIn, this.options.classNames.itemArrowLeftOut);
            break;
          }
          case hasNextSiblingCell: {
            currentCellOrder.direction === 'forward' && cell.classList.add(this.options.classNames.itemArrowRightOut);
            currentCellOrder.direction === 'backward' && cell.classList.add(this.options.classNames.itemArrowLeftOut);
            break;
          }
          case hasPrevSiblingCell: {
            currentCellOrder.direction === 'forward' && cell.classList.add(this.options.classNames.itemArrowRightIn);
            currentCellOrder.direction === 'backward' && cell.classList.add(this.options.classNames.itemArrowLeftIn);
            break;
          }
        }
      });
    });
  }

  private calcSingleColumnLayout(listMatrix: HTMLElement[][], orderQueueVariants: OrderQueueVariant[]) {
    listMatrix.forEach((row, rowIndex) => {
      const currentCellOrder = orderQueueVariants[rowIndex % orderQueueVariants.length];
      row.forEach((cell, cellIndex) => {
        cell.style.gridColumn = String(currentCellOrder.orderList[cellIndex]);
        cell.style.gridRow = String(rowIndex + 1);
        const hasNextSiblingRow = Array.isArray(listMatrix[rowIndex + 1]);
        const hasPrevSiblingRow = Array.isArray(listMatrix[rowIndex - 1]);

        cell.className = this.options.classNames.item;
        switch (true) {
          case hasPrevSiblingRow && hasNextSiblingRow: {
            cell.classList.add(this.options.classNames.itemArrowBottomIn);
            cell.classList.add(this.options.classNames.itemArrowBottomOut);
            break;
          }
          case hasNextSiblingRow: {
            cell.classList.add(this.options.classNames.itemArrowBottomOut);
            break;
          }
          case hasPrevSiblingRow: {
            cell.classList.add(this.options.classNames.itemArrowBottomIn);
            break;
          }
        }
      });
    });
  }

  private getListMartix(columnCount: number, items: HTMLElement[]): HTMLElement[][] {
    const result: HTMLElement[][] = [];
    for (let index = 0; index < items.length; index += columnCount) {
      result.push(items.slice(index, index + columnCount));
    }
    return result;
  }

  private calcColumnsCount(): number {
    const { itemsMinWidth, columnGap: gap } = this.options;
    const listElementWidth = this.listElement.offsetWidth;
    let columnCount = 1;
    while (this.isItemsFits(columnCount + 1, listElementWidth, itemsMinWidth, gap)) {
      columnCount++;
    }
    return columnCount;
  }

  private isItemsFits(columnCount: number, containerElementWidth: number, childElementWidth: number, gap: number) {
    return containerElementWidth - childElementWidth * columnCount - gap * (columnCount - 1) >= 0;
  }

  private getListItems(): HTMLElement[] {
    return Array.from(this.listElement.children).filter((item): item is HTMLElement => item instanceof HTMLElement);
  }

  private addEvents(): void {
    const resizeObs = new ResizeObserver(() => {
      const columnCount = this.calcColumnsCount();
      if (this.columnCount !== columnCount) {
        this.columnCount = columnCount;
        this.setLayout(this.items, columnCount);
      }
    });
    resizeObs.observe(this.listElement);

    const mutateObs = new MutationObserver(() => {
      const columnCount = this.calcColumnsCount();
      this.items = this.getListItems();
      this.setLayout(this.items, columnCount);
    });
    mutateObs.observe(this.listElement, {
      childList: true,
    });
  }
}
