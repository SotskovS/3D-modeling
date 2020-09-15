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
            hours = (Math.floor((timeRemaining) / 60 / 60) % 24);
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

  countTimer('15 september 2020 21:45');

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItemS = menu.querySelectorAll('ul>li');

    const handleMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handleMenu);
    closeBtn.addEventListener('click', handleMenu);      

    menuItemS.forEach( (item) => item.addEventListener('click', handleMenu));

  };

  toggleMenu();

  const togglePopup = () => {

    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');
    
    let count = 0,
      wiewScreen = document.documentElement.clientWidth;

    let flyInterval;
    let flyAnimate = () => {
      flyInterval = requestAnimationFrame(flyAnimate);
      count = count + 15;
      
      if (count < (wiewScreen / 100 * 40)) {
        popup.style.left = `${Math.floor(count / wiewScreen * 100)}%`;
      } else {
        cancelAnimationFrame(flyInterval);
      }
    };  
    
    
    
    console.dir(document.documentElement.clientWidth);
    
    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        flyInterval = requestAnimationFrame(flyAnimate);
               
        
      });
    });
    
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    
    togglePopup();
    
  };
});