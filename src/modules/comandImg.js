'use strict';

const comandImg = () => {

  const command = document.querySelector('.command'),
        img = command.querySelectorAll('img');
  
  img.forEach( item => {
    
    let src = null;
    
    item.addEventListener('mouseover', event => {
      
      src = event.target.getAttribute('src');

      event.target.src = event.target.dataset.img;
  
    });

    item.addEventListener('mouseout', event => {

      event.target.src = src;
  
    });
    
  });

};

export default comandImg;