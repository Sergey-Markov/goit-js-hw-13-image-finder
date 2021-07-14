import './sass/main.scss';
import imageGalleryTemplate from './handlebars/imageGalleryTemplate';
import ApiService from "./js/apiService.js";
import  'material-design-icons/iconfont/material-icons.css'
import "scroll-to-top-wc";
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import {  info, success, error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
defaults.delay = 500;

const apiService = new ApiService();
const refs = {
    imageSearch: document.querySelector('.text_field'),
    formBtn: document.querySelector('.form_Btn'),
    divElUnderForm: document.getElementById('searching'),
    moreLoadBtn: document.querySelector('.more-loadBtn'),
    btnMore:document.getElementById('more'),
    listGallery: document.querySelector('.gallery'),
};

refs.formBtn.addEventListener('click', newSearcing);
refs.moreLoadBtn.addEventListener('click', loadMore);



function newSearcing(){
    event.preventDefault();
    apiService.query = refs.imageSearch.value.trim();
    apiService.ressetPage();

    if(apiService.query.length === 0){
        const myError = error({
            text: "ПОДЧИНИСЬ или ВОСПРОСИ(правильно)"
          });
          refs.listGallery.innerHTML = '';          
          return refs.btnMore.classList.add('visually-hidden');
    };
    apiService.fetchCountries()
        .then(newRender)
        .catch(reject => console.log('error:',reject));
    
};
function newRender (response){
    if(apiService.query.length === 0 || response.hits.length === 0){
        const myError = error({
            text: "ПОДЧИНИСЬ или ВОСПРОСИ(правильно)"
          });
        return;
    } 
    if(apiService.query.length> 0 && response.hits.length > 0){
        const mySuccess = success({
            title: 'Success',
            text: "Как пожелаете повелитель!!!",
        });
        
        changeClassBtnMore();
        refs.listGallery.addEventListener('click', openModal);
        refs.listGallery.innerHTML = imageGalleryTemplate(response);
    };
};


function loadMore () {
    apiService.nextPage();
    addImg();
}
function addImg(){
    event.preventDefault();
    apiService.query = refs.imageSearch.value.trim();
    apiService.fetchCountries()
        .then(addRender)
        .catch(reject => console.log('error:',reject)); 
}; 
function addRender(response){
    if(apiService.query.length === 0 || response.hits.length === 0){
        return;
    };

    if(apiService.query.length > 0 && response.hits.length > 0){
        const mySuccess = success({
            title: 'Success',
            text: "Как пожелаете повелитель!!!",
        });
        refs.listGallery.insertAdjacentHTML( 'beforeend', imageGalleryTemplate(response));
        refs.moreLoadBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
        refs.listGallery.addEventListener('click', openModal);
    };
};



function changeClassBtnMore (){
    refs.btnMore.classList.remove('visually-hidden');
};
function openModal(e) {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    basicLightbox
        .create(`<img class="lightbox__image" src=${e.target.dataset.source} alt="">`)
        .show();
        
        
};
 
 
    
