window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const countTimer = (deadline) => {

    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');
    
    const getTimeRemaining = () => {

      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = (Math.floor(timeRemaining) % 60),
        minutes = (Math.floor((timeRemaining) / 60) % 60),
        hours = (Math.floor((timeRemaining) / 60 / 60));
        return {timeRemaining, hours, minutes, seconds};
    };

    const updateClock = () => {
  
      const timer = (getTimeRemaining());

      timerHours.textContent = (timer.hours < 10) ? `0${timer.hours}` : timer.hours;
      timerMinutes.textContent = (timer.minutes < 10) ? `0${timer.minutes}` : timer.minutes;
      timerSeconds.textContent = (timer.seconds < 10) ? `0${timer.seconds}` : timer.seconds;
      
      if (timer.timeRemaining <= 0) {
        clearInterval(timeInterval);

        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
      
    };  
    
    const timeInterval = setInterval(updateClock, 1000);
    
  };  

  countTimer('18 september 2020 21:45');

  // menu

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
      } else if (target.closest('menu.close-btn')) {
        handleMenu();
      } else if (target.closest('menu > ul')) {        
        handleMenu();
      }

    });
    
  };

  toggleMenu();

  //popup

  const togglePopup = () => {

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
        popup.style.display = 'block';
        if (wiewScreen > 768) {
          request = requestAnimationFrame(movePopup);          
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

  togglePopup();

  // tabs 

  const tabs = () => {
    
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {

      tabContent.forEach( (item, i) => {

        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }

      });

    };
    
    tabHeader.addEventListener('click', event => {
      
      let target = event.target;
      target = target.closest('.service-header-tab');
      
      if (target) {
        tab.forEach( (item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
        return;
      }

    });

    toggleTabContent();

  };

  tabs();

});
