'use strict';

const togglePopUp = () => {

  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');

  let request, 
    count = 0,
    wiewScreen = document.documentElement.clientWidth;

  let movePopup = () => {

    request = requestAnimationFrame(movePopup);
    count = count + 15;
    
    if (count < (wiewScreen / 100 * 37)) {
      popupContent.style.left = `${Math.floor(count / wiewScreen * 100)}%`;
    } else {
      cancelAnimationFrame(request);
    }

  };  

  popupBtn.forEach((item) => {

    item.addEventListener('click', () => {

      wiewScreen = document.documentElement.clientWidth;
      
      if (wiewScreen > 768) {
        request = requestAnimationFrame(movePopup);          
        popup.style.display = 'block';
      } else {
        popup.style.display = 'block';
      }
    });

  });
  
  popup.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      popup.removeAttribute('style');  
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popup.removeAttribute('style');
      }
    }
  });
  
};

export default togglePopUp;