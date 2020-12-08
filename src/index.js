'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import comandImg from './modules/comandImg';
import countTimer from './modules/countTimer';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';

calc();
comandImg();
countTimer('1 january 2021');
sendForm();
slider();
tabs();
toggleMenu();
togglePopUp();