// -------------------------------------
// MENU TO TOGGLE NAV ON MOBILE

const navToggle = document.querySelector('.js-btn-nav-toggle'),
  navSidebar = document.querySelector('.js-nav'),
  navLink = document.querySelectorAll('.nav-link')

navToggle.addEventListener('click', function(e) {
  e.preventDefault();
  this.classList.toggle('btn-nav-toggle--active');
  navSidebar.classList.toggle('nav--active');
});


// ACTIVE NAVIGATION CLASS BASED ON CURRENT HREF
var activeNavlink = document.querySelectorAll('.nav-link[href$="/' + location.pathname.split("/")[1] + '"]');

if (activeNavlink.length) {
  activeNavlink[0].classList.add('nav-link--active');
}

// DROPDOWN MENU FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
  const dropdownItems = document.querySelectorAll('.js-nav-list-li-dropdown');

  dropdownItems.forEach(dropdownItem => {
    const dropdownLink = dropdownItem.querySelector('.js-nav-link-dropdown');
    const dropdownMenu = dropdownItem.querySelector('.js-nav-dropdown');

    if (!dropdownLink || !dropdownMenu) return; // Prevent errors if elements are missing

    // Toggle dropdown on click
    dropdownLink.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isCurrentlyOpen = dropdownMenu.classList.contains('nav-dropdown--active');

      // Close all other dropdowns
      document.querySelectorAll('.nav-dropdown--active').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove('nav-dropdown--active');

          const parentDropdown = menu.closest('.js-nav-list-li-dropdown');
          if (parentDropdown) {
            const parentLink = parentDropdown.querySelector('.js-nav-link-dropdown');
            if (parentLink) parentLink.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current dropdown
      dropdownMenu.classList.toggle('nav-dropdown--active');
      dropdownLink.setAttribute('aria-expanded', !isCurrentlyOpen);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.js-nav-list-li-dropdown')) {
      document.querySelectorAll('.nav-dropdown--active').forEach(menu => {
        menu.classList.remove('nav-dropdown--active');
      });
      document.querySelectorAll('.js-nav-link-dropdown').forEach(link => {
      link.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

// CUSTOM DROPDOWN FOR BANNER
document.addEventListener('DOMContentLoaded', function () {
  const customDropdowns = document.querySelectorAll('.custom-dropdown');

  customDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.custom-dropdown-toggle');
    const menu = dropdown.querySelector('.custom-dropdown-menu');
    const text = dropdown.querySelector('.custom-dropdown-text');
    const menuItems = dropdown.querySelectorAll('.custom-dropdown-menu a');

    if (!toggle || !menu || !text) return;

    // Toggle dropdown on button click
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      // Close all other dropdowns
      customDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          const otherToggle = otherDropdown.querySelector('.custom-dropdown-toggle');
          const otherMenu = otherDropdown.querySelector('.custom-dropdown-menu');
          if (otherToggle && otherMenu) {
            otherToggle.setAttribute('aria-expanded', 'false');
            otherMenu.setAttribute('aria-hidden', 'true');
          }
        }
      });

      // Toggle current dropdown
      this.setAttribute('aria-expanded', newState);
      menu.setAttribute('aria-hidden', !newState);
    });

    // Handle menu item selection
    menuItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedText = this.textContent.trim();
        text.textContent = selectedText;
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');

        // Navigate to the link
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
      }
    });

    // Keyboard navigation
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      } else if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
      }
    });

    // Arrow key navigation in menu
    let currentIndex = -1;
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          currentIndex = (currentIndex + 1) % menuItems.length;
          menuItems[currentIndex].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          currentIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
          menuItems[currentIndex].focus();
        } else if (e.key === 'Escape') {
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          toggle.focus();
        }
      });
    });
  });
});
