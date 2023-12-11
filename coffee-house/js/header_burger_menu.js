const navBlock = document.querySelector('.header_navigation-block');
const burgerMenuButton = document.querySelector('.burger-menu_button');
const documentBody = document.querySelector('.body');

function closeMenuListener(event) {
  if(event.target.matches('.burger-menu_button') !== true) {
    closeMenu();
  }
}

function toggleMenu() {
  burgerMenuButton.classList.toggle('show_menu');
  
  if (burgerMenuButton.classList.contains('show_menu')) {
    navBlock.classList.add('show_menu');
    documentBody.classList.add('show_menu');
    document.addEventListener('click', closeMenuListener);
  } else {
    navBlock.classList.remove('show_menu');
    documentBody.classList.remove('show_menu');
    document.removeEventListener('click', closeMenuListener);
  }
}

function closeMenu() {
  navBlock.classList.remove('show_menu');
  burgerMenuButton.classList.remove('show_menu');
  documentBody.classList.remove('show_menu');
  document.removeEventListener('click', closeMenuListener);
}

burgerMenuButton.addEventListener('click', toggleMenu);