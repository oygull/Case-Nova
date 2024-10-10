// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
import { mobileCheck } from "./functions/mobile-check";
import {ModalManage} from "./components/_modal";
import { HTTPWorker } from "../js/functions/HTTPWorker";
import {HtmlWorker} from "./functions/htmlWorker";


async function renderEqupments(id){
  const httpWorker = new HTTPWorker(`https://casenova.uz/api/v1`);
  const { body } = await httpWorker.get(`/equipment/${id}`);
  const htmlWorker = new HtmlWorker();
  const modalDiv = document.querySelector('.modal_body')
  try {
    console.log('try: ', modalDiv);
      htmlWorker.render(
        modalDiv,
        `
          <div class="modal_body_content">
            <div class="equipments__block__card--head">
              <p>{{subTitle}}</p>
              <div class="wrap">
                <h2>{{title}}</h2>
              </div>
            </div>
            <div class="equipments__block__card--img">
              <img src="{{image}}" alt="">
            </div>
             <p class="machinery__body--text">{{content}}</p>
          </div>
      `,
        body?.data
      );
  }
  catch (e) {
   console.log(e)
  }
}

async function renderServices(id){
  const httpWorker = new HTTPWorker(`https://casenova.uz/api/v1`);
  const { body } = await httpWorker.get(`/services/${id}`);
  const htmlWorker = new HtmlWorker();
  const modalDiv = document.querySelector('.modal_body')
  try {
    console.log('try: ', modalDiv);
    htmlWorker.render(
      modalDiv,
      `
          <div class="modal_body_services">
            <div class="services_block__card--head">
              <img src="{{image}}" alt="">
            </div>
            <div class="content_body">
                 <h3 class="servisex_modal_title">{{title}}</h3>

            </div>

          </div>
      `,
      body?.data
    );
  }
  catch (e) {
    console.log(e)
  }
}

async function renderBlog(id){
  const httpWorker = new HTTPWorker(`https://casenova.uz/api/v1`);
  const { body } = await httpWorker.get(`/blog/${id}`);
  const htmlWorker = new HtmlWorker();
  const modalDiv = document.querySelector('.modal_body')
  try {
   console.log(body)
    htmlWorker.render(
      modalDiv,
      `
          <div class="modal_body_blog">
            <div class="services_block__card--head">
              <img src="{{image}}" alt="">
            </div>
            <div class="content_body">
                 <h3 class="servisex_modal_title">{{title}}</h3>
                 {{content}}
            </div>

          </div>
      `,
      body?.data
    );
  }
  catch (e) {
    console.log(e)
  }
}


export async function modalHandler (elemSelector, type = '') {
  const triggerElem = document.querySelectorAll(elemSelector);
  const modal = new ModalManage();
  if(triggerElem){
    triggerElem.forEach(e =>{
      e.addEventListener('click', () => {
        if(e.classList.contains('modalBtn')){
          const attribute = e.getAttribute('data-eq');
          const id = e.getAttribute('data-id');
          const displayedMachinery = document.querySelector(`.${attribute}`);
          modal.showModal(displayedMachinery);

          if(type === 'equipment'){
            renderEqupments(id);
          }
          else if(type === 'services'){
            renderServices(id);
          }
          else if(type === 'blog'){
            renderBlog(id)
            console.log('blog')
          }


        }
      });
    })
  }
}

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
// import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });

// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// import { validateForms } from './functions/validate-forms';
// const rules1 = [...];

// const afterForm = () => {
//   console.log('Произошла отправка, тут можно писать любые действия');
// };

// validateForms('.form-1', rules1, afterForm);
