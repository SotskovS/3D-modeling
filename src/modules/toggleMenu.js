'use strict';

const toggleMenu = () => {

  const body = document.querySelector('body'),
    menu = document.querySelector('menu'),
    menuItemS = menu.querySelectorAll('ul>li');
  
  const handleMenu = () => {
    menu.classList.toggle('active-menu');
  };
 
  body.addEventListener('click', event => {
    let target = event.target;

    if (target.closest('.menu')) {
      handleMenu();
    } else if (target.closest('menu > a.close-btn')) {        
      handleMenu();
    } else if (target.closest('menu > ul > li > a')) {                
      handleMenu();
    } 
    
  });
  
};

export default toggleMenu;