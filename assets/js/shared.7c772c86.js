"use strict";(self.webpackChunkwbooster_test=self.webpackChunkwbooster_test||[]).push([[804],{5617:(t,s,e)=>{function i(t,s=document){const e=function(t,s=document){const e=s.querySelector(t);if(!e)throw Error(`element ${t} does not exist`);return e}(t,s);if(e instanceof HTMLElement)return e;throw new Error(`the element found with selector "${t}" with type ${e.constructor.name} is not an instance of HTMLelement`)}function n(t,s=document){const e=function(t,s=document){const e=Array.from(s.querySelectorAll(t));if(!e.length)throw Error(`elements ${t} does not exist`);return e}(t,s);if(function(t){return t.every((t=>function(t){return t instanceof HTMLElement}(t)))}(e))return e;throw new Error(`the elements found with selector "${t}" is not an instance of HTMLelement`)}e.d(s,{EA:()=>n,XF:()=>i})},4191:()=>{},5097:(t,s,e)=>{var i=e(5617);const n={containerClass:"burger-menu",menuClass:"burger-menu__menu",togglerButtonClass:"burger-menu__toggler",openedClass:"burger-menu__content--open",closeButtonClass:"burger-menu__content-close-button",backdropClass:"burger-menu__backdrop",closeBreakpoint:768};class o{constructor(t,s,e=null){this.closeButtonElement=null,this.itemElements=[],this.isOpen=!1,this.handleTogglerClick=this.togglerButtonClickEventHandler.bind(this),this.handleOutClick=this.outerClickHandler.bind(this),this.handleCloseButtonClick=this.close.bind(this),this.onInitHandler=null,this.onOpenHandler=null,this.onCloseHandler=null,this.params=Object.assign({},n,s),this.onInitHandler=e,t instanceof HTMLElement?this.containerElement=t:this.containerElement=(0,i.XF)(t),this.togglerButtonElement=(0,i.XF)(`.${this.params.togglerButtonClass}`),this.closeButtonElement=(0,i.XF)(`.${this.params.closeButtonClass}`);const o=(0,i.XF)(`.${this.params.menuClass}`);this.itemElements=Array.from(o.children).filter((t=>t instanceof HTMLElement)),this.backdropElement=document.createElement("div"),this.backdropElement.classList.add(this.params.backdropClass),this.backdropElement.style.visibility="hidden",document.body.append(this.backdropElement),this.addEvents(),this.onInitHandler&&this.onInitHandler(this),this.setWindowSizeObserver()}setWindowSizeObserver(){new ResizeObserver((t=>{for(const s of t)s.contentRect.width>=this.params.closeBreakpoint&&this.close()})).observe(document.body)}close(){this.isOpen&&(this.switchOpenState(!1),this.backdropElement.style.visibility="hidden",document.documentElement.style.overflow="visible",this.onCloseHandler&&this.onCloseHandler(this))}open(){this.isOpen||(this.switchOpenState(!0),this.backdropElement.style.visibility="visible",document.documentElement.style.overflow="hidden",this.onOpenHandler&&this.onOpenHandler(this))}destroy(){this.backdropElement.remove(),this.removeEvents()}onInit(t){this.onInitHandler=t}onOpen(t){this.onOpenHandler=t}onClose(t){this.onCloseHandler=t}switchOpenState(t){this.isOpen=t,this.containerElement.classList.toggle(this.params.openedClass,this.isOpen)}addEvents(){var t;this.togglerButtonElement.addEventListener("click",this.handleTogglerClick),document.addEventListener("click",this.handleOutClick),null===(t=this.closeButtonElement)||void 0===t||t.addEventListener("click",this.handleCloseButtonClick),this.itemElements.forEach((t=>{t.addEventListener("click",(()=>this.close()))}))}removeEvents(){var t;this.togglerButtonElement.removeEventListener("click",this.handleTogglerClick),document.removeEventListener("click",this.handleOutClick),null===(t=this.closeButtonElement)||void 0===t||t.removeEventListener("click",this.handleCloseButtonClick)}togglerButtonClickEventHandler(){this.isOpen?this.close():this.open()}outerClickHandler(t){t.target===this.backdropElement&&this.close()}}!function(){const t=(0,i.XF)(".page-header");window.addEventListener("scroll",(()=>{t.classList.toggle("page-header--scrolled",window.scrollY>0)}),{passive:!0}),function(t){const s=(0,i.XF)("main > section:first-of-type"),e=parseInt(getComputedStyle(s).paddingTop),n=()=>{const i=t.clientHeight;s.style.paddingTop=`${e+i}px`};new MutationObserver(n).observe(t,{childList:!0,subtree:!0}),new ResizeObserver(n).observe(t)}(t),function(){const t=parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--layout-breakpoint-medium")||"870");new o(".burger-menu",{containerClass:"burger-menu",menuClass:"burger-menu__menu",togglerButtonClass:"page-header__burger-menu-button",openedClass:"burger-menu--open",closeButtonClass:"burger-menu__close-button",backdropClass:"burger-menu__backdrop",closeBreakpoint:t})}()}(),(0,i.XF)(".page-footer__button").addEventListener("click",(()=>alert("Вызов формы")))},8181:(t,s,e)=>{var i=e(5617),n=e(3871);const o={slotClass:"accordion__slot",slotOpenClass:"accordion__slot--open",slotOpenedClass:"accordion__slot--opened",slotCloseClass:"accordion__slot--close",slotClosedClass:"accordion__slot--closed",summaryClass:"accordion__summary",triggerClass:"accordion__trigger",iconClass:"accordion__icon"};var l=e(1236),r=e(9636);function a(t,s,e,i){return e-s*t-i*(t-1)>=0}const c={itemsMinWidth:240,columnGap:8,rowGap:12,direction:"backward",classNames:{list:"arrow-list",item:"arrow-list__item",itemArrowRightOut:"arrow-list__item--to-right-out",itemArrowLeftOut:"arrow-list__item--to-left-out",itemArrowRightIn:"arrow-list__item--to-right-in",itemArrowLeftIn:"arrow-list__item--to-left-in",itemArrowBottomOut:"arrow-list__item--to-bottom-out",itemArrowBottomIn:"arrow-list__item--to-bottom-in",itemArrowBottomOutRightIn:"arrow-list__item--to-bottom-out-to-right-in",itemArrowBottomOutLeftIn:"arrow-list__item--to-bottom-out-to-left-in",itemArrowBottomInLeftOut:"arrow-list__item--to-bottom-in-to-left-out",itemArrowBottomInRightOut:"arrow-list__item--to-bottom-in-to-right-out"}};class m{constructor(t,s){this.columnCount=null,this.options=Object.assign(Object.assign({},c),s);const e=null!=t?t:(0,i.XF)(this.options.classNames.list);this.listElement=e,this.items=this.getListItems(),0!==this.items.length&&this.addEvents()}setLayout(t,s){const e=this.getListMartix(s,t),i=new Array(s).fill(null).map(((t,s)=>s+1)),n=i.slice().reverse(),o=[{direction:"forward",orderList:i},{direction:"backward",orderList:n}],l="forward"===this.options.direction?o:o.slice().reverse();s>1?this.calcMultipleColumnLayout(e,l):this.calcSingleColumnLayout(e,l),this.listElement.style.display="grid",this.listElement.style.columnGap=this.options.columnGap+"px",this.listElement.style.rowGap=this.options.rowGap+"px",this.listElement.style.gridTemplateColumns=`repeat(${s}, 1fr)`}calcMultipleColumnLayout(t,s){t.forEach(((e,i)=>{const n=s[i%s.length];e.forEach(((s,o)=>{s.style.gridColumn=String(n.orderList[o]),s.style.gridRow=String(i+1);const l=0===o,r=o===e.length-1,a=Boolean(e[o+1]),c=Boolean(e[o-1]),m=Array.isArray(t[i+1]),d=Array.isArray(t[i-1]);switch(s.className=this.options.classNames.item,!0){case l&&d:a?("forward"===n.direction&&s.classList.add(this.options.classNames.itemArrowBottomInRightOut),"backward"===n.direction&&s.classList.add(this.options.classNames.itemArrowBottomInLeftOut)):("forward"===n.direction&&s.classList.add(this.options.classNames.itemArrowBottomIn),"backward"===n.direction&&s.classList.add(this.options.classNames.itemArrowBottomIn));break;case r&&m:"forward"===n.direction&&s.classList.add(this.options.classNames.itemArrowBottomOutRightIn),"backward"===n.direction&&s.classList.add(this.options.classNames.itemArrowBottomOutLeftIn);break;case a&&c:"forward"===n.direction&&s.classList.add(this.options.classNames.itemArrowRightIn,this.options.classNames.itemArrowRightOut),"backward"===n.direction&&s.classList.add(this.options.classNames.itemArrowLeftIn,this.options.classNames.itemArrowLeftOut);break;case a:"forward"===n.direction&&s.classList.add(this.options.classNames.itemArrowRightOut),"backward"===n.direction&&s.classList.add(this.options.classNames.itemArrowLeftOut);break;case c:"forward"===n.direction&&s.classList.add(this.options.classNames.itemArrowRightIn),"backward"===n.direction&&s.classList.add(this.options.classNames.itemArrowLeftIn)}}))}))}calcSingleColumnLayout(t,s){t.forEach(((e,i)=>{const n=s[i%s.length];e.forEach(((s,e)=>{s.style.gridColumn=String(n.orderList[e]),s.style.gridRow=String(i+1);const o=Array.isArray(t[i+1]),l=Array.isArray(t[i-1]);switch(s.className=this.options.classNames.item,!0){case l&&o:s.classList.add(this.options.classNames.itemArrowBottomIn),s.classList.add(this.options.classNames.itemArrowBottomOut);break;case o:s.classList.add(this.options.classNames.itemArrowBottomOut);break;case l:s.classList.add(this.options.classNames.itemArrowBottomIn)}}))}))}getListMartix(t,s){const e=[];for(let i=0;i<s.length;i+=t)e.push(s.slice(i,i+t));return e}calcColumnsCount(){const{itemsMinWidth:t,columnGap:s}=this.options,e=this.listElement.offsetWidth;let i=1;for(;this.isItemsFits(i+1,e,t,s);)i++;return i}isItemsFits(t,s,e,i){return s-e*t-i*(t-1)>=0}getListItems(){return Array.from(this.listElement.children).filter((t=>t instanceof HTMLElement))}addEvents(){new ResizeObserver((()=>{const t=this.calcColumnsCount();this.columnCount!==t&&(this.columnCount=t,this.setLayout(this.items,t))})).observe(this.listElement),new MutationObserver((()=>{const t=this.calcColumnsCount();this.items=this.getListItems(),this.setLayout(this.items,t)})).observe(this.listElement,{childList:!0})}}!function(t){const s=(0,i.XF)(".manufacturers-section__slider-wrapper");new ResizeObserver((()=>{var e,i,n;const o=s.clientWidth,l=null!==(i=null===(e=t.slides[0].firstElementChild)||void 0===e?void 0:e.clientWidth)&&void 0!==i?i:240,r=null!==(n="string"==typeof t.params.spaceBetween?parseInt(t.params.spaceBetween):t.params.spaceBetween)&&void 0!==n?n:0;let c=1;for(;a(c+1,l,o,r);)c++;t.el.style.width=c*l+18*(c-1)+"px",t.params.slidesPerView=c})).observe(s)}(new l.A(".manufacturers-section .brand-slider",{modules:[r.Vx],loop:!0,navigation:{nextEl:".brand-slider__button--next",prevEl:".brand-slider__button--prev"},spaceBetween:18})),function(){const t=(0,i.XF)(".arrow-list");new m(t,{itemsMinWidth:380,columnGap:20,rowGap:30,direction:"forward"}),(0,i.XF)(".steps-section__action-button").addEventListener("click",(()=>alert("Вызов формы")))}(),new class{constructor(t,s={}){this._slots=[],this.classParams=Object.assign({},o),this.isInitialized=!1,this.closeHandler=null,this.openHandler=null,this.initHandler=null,this.options=s,this.rootElement="string"==typeof t?(0,i.XF)(t):t;const{init:e=!0}=this.options;e&&this.init()}get slots(){if(this.isInitialized)return this._slots;throw new Error("Accordion is not initialized")}init(){this.destroy();const{classParams:t,defaultOpenSlotIndex:s=0}=this.options;t&&Object.assign(this.classParams,t),this._slots=this.getSlots(),this.addEvents(),"number"==typeof s&&this.openSlot(s),this.isInitialized=!0,this.initHandler&&this.initHandler(this)}destroy(){this.removeEvents(),this._slots=[],this.isInitialized=!1}onOpen(t){this.openHandler=t}onClose(t){this.closeHandler=t}onInit(t){this.initHandler=t}getSlots(){return(0,i.EA)(`.${this.classParams.slotClass}`,this.rootElement).map((t=>{const s={containerElement:t,triggerElement:(0,i.XF)(`.${this.classParams.triggerClass}`,t),iconElement:(0,i.XF)(`.${this.classParams.iconClass}`,t),isOpen:!1};return s.containerElement.classList.toggle(this.classParams.slotOpenedClass,s.isOpen),s.containerElement.classList.toggle(this.classParams.slotClosedClass,!s.isOpen),s}))}addEvents(){this._slots.forEach(((t,s)=>{t.containerElement.addEventListener("click",(e=>{const i=e.target;i instanceof Element&&i.closest("."+this.classParams.summaryClass)&&(t.isOpen?this.closeSlot(s):this.openSlot(s))})),t.containerElement.addEventListener("transitionend",(()=>{t.containerElement.classList.toggle(this.classParams.slotOpenedClass,t.isOpen),t.containerElement.classList.toggle(this.classParams.slotClosedClass,!t.isOpen),t.containerElement.classList.remove(this.classParams.slotOpenClass),t.containerElement.classList.remove(this.classParams.slotCloseClass)}))}))}removeEvents(){this._slots.forEach((t=>{const s=t.containerElement.cloneNode(!0);this.rootElement.replaceChild(s,t.containerElement)}))}openSlot(t){const s=this._slots[t];s.isOpen||(s.isOpen=!0,s.containerElement.classList.toggle(this.classParams.slotOpenClass,s.isOpen),s.containerElement.classList.toggle(this.classParams.slotCloseClass,!s.isOpen),s.containerElement.classList.remove(this.classParams.slotClosedClass),this.openHandler&&this.openHandler(s),this.options.multiOpen||this._slots.forEach(((s,e)=>{e!==t&&this.closeSlot(e)})))}closeSlot(t){const s=this._slots[t];!1!==s.isOpen&&(s.isOpen=!1,s.containerElement.classList.toggle(this.classParams.slotOpenClass,s.isOpen),s.containerElement.classList.toggle(this.classParams.slotCloseClass,!s.isOpen),s.containerElement.classList.remove(this.classParams.slotOpenedClass),this.closeHandler&&this.closeHandler(s))}}(".faq-section .accordion",{defaultOpenSlotIndex:1}),function(){const t=(0,i.XF)('[name="user-phone"]');(0,n.Ay)(t,{mask:"+{7}(000)000-00-00"}),(0,i.XF)(".form-callback").addEventListener("submit",(t=>{t.preventDefault(),alert("Отправка формы")}))}()}}]);