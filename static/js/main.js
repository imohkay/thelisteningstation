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
