// ACCESSIBLE VANILLA JS ACCORDION
// Supports keyboard navigation, ARIA attributes, and screen readers
// Pass data-multiple="true" for opening multiple items at a time
// Pass data-multiple="false" for opening a single item at a time

document.addEventListener('DOMContentLoaded', function() {
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');
    const multiple = accordion.getAttribute('data-multiple') === 'true';
    
    items.forEach((item, index) => {
      const button = item.querySelector('.accordion-item-title');
      const content = item.querySelector('.accordion-item-content');
      
      // Handle click events
      button.addEventListener('click', function() {
        toggleAccordionItem(this, content, multiple, accordion);
      });
      
      // Handle keyboard events
      button.addEventListener('keydown', function(e) {
        switch(e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            toggleAccordionItem(this, content, multiple, accordion);
            break;
          case 'ArrowDown':
            e.preventDefault();
            focusNextItem(accordion, index);
            break;
          case 'ArrowUp':
            e.preventDefault();
            focusPreviousItem(accordion, index);
            break;
          case 'Home':
            e.preventDefault();
            focusFirstItem(accordion);
            break;
          case 'End':
            e.preventDefault();
            focusLastItem(accordion);
            break;
        }
      });
    });
  });
});

function toggleAccordionItem(button, content, multiple, accordion) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // Close current item if it's open
  if (isExpanded) {
    button.setAttribute('aria-expanded', 'false');
    content.setAttribute('hidden', '');
    content.classList.remove('accordion-item-content--active');
    button.classList.remove('accordion-item-title--active');
    return;
  }
  
  // Close other items if not multiple
  if (!multiple) {
    const openButtons = accordion.querySelectorAll('.accordion-item-title[aria-expanded="true"]');
    const openContents = accordion.querySelectorAll('.accordion-item-content:not([hidden])');
    
    openButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('accordion-item-title--active');
    });
    
    openContents.forEach(cont => {
      cont.setAttribute('hidden', '');
      cont.classList.remove('accordion-item-content--active');
    });
  }
  
  // Open current item
  button.setAttribute('aria-expanded', 'true');
  content.removeAttribute('hidden');
  content.classList.add('accordion-item-content--active');
  button.classList.add('accordion-item-title--active');
}

function focusNextItem(accordion, currentIndex) {
  const items = accordion.querySelectorAll('.accordion-item-title');
  const nextIndex = (currentIndex + 1) % items.length;
  items[nextIndex].focus();
}

function focusPreviousItem(accordion, currentIndex) {
  const items = accordion.querySelectorAll('.accordion-item-title');
  const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
  items[prevIndex].focus();
}

function focusFirstItem(accordion) {
  const firstItem = accordion.querySelector('.accordion-item-title');
  if (firstItem) firstItem.focus();
}

function focusLastItem(accordion) {
  const items = accordion.querySelectorAll('.accordion-item-title');
  const lastItem = items[items.length - 1];
  if (lastItem) lastItem.focus();
}