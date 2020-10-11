window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  //timer

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
      } else if (target.closest('menu > a.close-btn')) {        
        handleMenu();
      } else if (target.closest('menu > ul > li > a')) {                
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
    
  };

  tabs();

  // slider

  const slider = () => {

    const slide = document.querySelectorAll('.portfolio-item'),
          bth = document.querySelectorAll('.portfolio-btn'),        
          slider = document.querySelector('.portfolio-content'),
          portfolioDots = document.querySelector('.portfolio-dots');
          
    const addLi = () => {
      const li = document.createElement('li');
      li.classList.add('dot');      
      portfolioDots.appendChild(li);  
    };  
    
    slide.forEach( () => {      
      addLi();      
    });   
    
    const dot = document.querySelectorAll('.dot'); 
    
    dot[0].classList.add('dot-active');
    
    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >=slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
       clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');


      if (target.matches('#arrow-right')) {
        currentSlide++;

        if (currentSlide >=  slide.length) {
          currentSlide = 0;
        }

      } else if (target.matches('#arrow-left')) {
        currentSlide--;

        if (currentSlide < 0) {          
          currentSlide = slide.length - 1;
        }

      } else if (target.matches('.dot')) {        
        dot.forEach( (elem, index) => {          
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', event => {

      if ((event.target.matches('.portfolio-btn')) || (event.target.matches('.dot'))) {
        stopSlide();
      }

    });  

    slider.addEventListener('mouseout', event => {

      if ((event.target.matches('.portfolio-btn')) || (event.target.matches('.dot'))) {
        startSlide();
      }

    }); 

    startSlide(1500);

  };  

  slider();

  // comand

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

  comandImg();
  
  //calc 

  const calc = () => {

    const calcBlock = document.querySelector('.calc-block'),
          calckInput = calcBlock.querySelectorAll('input');

    calckInput.forEach( input => {

      input.addEventListener('input', () => {

        input.value = input.value.replace(/\D/g, '');

      });
    });

  };

  calc();

});
