// src/components/dropdown/index.js

export class Dropdown {
  constructor(root) {
    this.root = root;
    this.toggle = this.root.querySelector('.dropdown-toggle');
    this.menu = this.root.querySelector('.dropdown-menu');

    // Add chevron only if root has 'dropdown--chevron' class
    if (
      this.root.classList.contains('dropdown--chevron') &&
      this.toggle &&
      !this.toggle.querySelector('.dropdown-chevron')
    ) {
      const chevron = document.createElement('span');
      chevron.className = 'dropdown-chevron';
      chevron.innerHTML = `
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        `;
      this.toggle.appendChild(chevron);
    }

    if (this.toggle && this.menu) {
      this.items = this.menu.querySelectorAll('.dropdown-item');
      this.bindEvents();
    }
  }

  bindEvents() {
    this.toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.root.contains(e.target)) this.closeMenu();
    });

    // Close when clicking items
    this.items.forEach((item) => {
      item.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.menu.classList.toggle('visible');
    this.toggle.setAttribute(
      'aria-expanded',
      this.menu.classList.contains('visible')
    );
  }

  closeMenu() {
    this.menu.classList.remove('visible');
    this.toggle.setAttribute('aria-expanded', 'false');
  }
}

export function initDropdowns(selector = '.dropdown') {
  document.querySelectorAll(selector).forEach((el) => new Dropdown(el));
}
