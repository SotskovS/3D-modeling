'use strict';

const sendForm = (idForm) => {
    
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #ffffff';
  
  const postForm = idForm => {

    const form = document.getElementById(idForm);
    
    form.querySelector('.form-btn').disabled = true;
    
    form.addEventListener('input', event => {

      let target = event.target;

      let formBtn = form.querySelector('.form-btn');

      if (target.getAttribute('name') === 'user_phone') {

        target.value = target.value.replace(/(?!\+)\D/g, '');
          
        while ((/\+?[0-9]{11}/).test(target.value)) {
          formBtn.disabled = false;
          break;
        } 

        if (!(/\d{11}/).test(target.value) || (/\d{12}/).test(target.value)) {
          formBtn.disabled = true;
        }   
      
      }

      if (target.getAttribute('name') === 'user_name') {

          if (!/[а-яА-ЯёЁ]|\s/.test(target.value)) {
            target.value = '';                          
          }

      }

      if (target.getAttribute('name') === 'user_message') {

        if (!/[а-яА-ЯёЁ]|\s|\W/.test(target.value)) {
          target.value = '';                          
        }

      }
      
    });

    const formInputs = form.querySelectorAll('input');

    form.addEventListener('submit', () => {
      event.preventDefault();
      form.append(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(form);        
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;          
      });

      postData(body, 
        () => {
          statusMessage.textContent = successMessage;
        }, () => {
          statusMessage.textContent = errorMessage;
          console.log(error);
        }
      );

      formInputs.forEach( item => {          
        item.value = '';
      });

    });

  };

  postForm('form1');
  postForm('form2');
  postForm('form3');
  
  const postData = (body, outputData, errorData) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {

      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        outputData();          
      } else {
        errorData(request.status);          
      }

    });

    request.open('POST', '../server.php');
    request.setRequestHeader('contentType', 'application/json');
    
    request.send(JSON.stringify(body));
  };

};

export default sendForm;