import { ModernAccordion } from '../../libs/ModernAccordion';

export function initFAQSection() {
  new ModernAccordion('.faq-section .accordion', { defaultOpenSlotIndex: 1 });
}
