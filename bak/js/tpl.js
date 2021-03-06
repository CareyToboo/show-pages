
import config from './config.yaml';
import anime from '../lib/anima.min';
import '../lib/tiny.slider';

import { LOADIPHLPAPI } from 'dns';

const forEach = [].forEach;

const tpl = tplConfig => {
  const { items, scrollnums } = tplConfig || {};
  let html = ``;
  if (!items) {
    return '配置';
  }
  for(const itemkey in items) {
    const { data, classes = '', noDefclass } = items[itemkey] || {};
    let dataset = ``;
    if(data){
      for(const datakey in data) {
        dataset += ` data-${datakey}="${data[datakey]}"`
      }
    }
    const defcls = noDefclass === true ? '' : `css-animate animated hide w ${itemkey}`;
    html += `<div class="${defcls} ${classes ? classes : ''}" ${dataset}></div>\n`;
  }
  if(scrollnums) {
    for(const numKey in scrollnums) {
      const{ type, key = numKey, val, data, duration = 1000, time = 0, height } = scrollnums[numKey] || {};
      if (!type || !val) return html;
      html += `<div class="num-wrapper num-wrapper-${key} css-animate animated hide"
        data-animate="fadeIn" data-time="${time}" data-val="${val}">`;
      let num = `<ul class="num-set-${type} nums-${key}">`;
      for(let i = 0; i < String(val).length; i++){
        num+= `<li></li>`;
      }
      num+='</ul>';
      html += `${num}\n</div>`;


    }
  }
  return html;
};

export const getTpl = key => {
  if (config[key]) {
    return tpl(config[key]);
  }else {
    return '配置';
  }
};

export const changePAGE2 = (type) => {
  const $page = document.querySelector('.page-2');

  if (document.querySelector('.ren-wrapper')) {
    forEach.call(document.querySelectorAll('.ren-wrapper li'), dom => {
      dom.style.cssText = 'opacity:0;transform: scale(1)';
    });
  } else {

    let $wrapper = document.createElement('div');
    let html = `<div class="ren-wrapper">`;
    let nan = `<ul class="ren-nan-wrapper">`;
    for(let i = 0; i < 9; i++){
      nan+= `<li class="w w-ren-nan ${ i==5 ? 'ren-nan-s' : ''}" ></li>`;
    }
    nan+='</ul>';
    // nv+='</ul>';
    html+= `${nan}\n</div>`;
    $wrapper.innerHTML = html;
    $page.appendChild($wrapper);
  }
  if (type == 'before') return;
  let timer = setTimeout(()=> {
    if(!document.querySelector('.page-2.cur')) return;
    anime.timeline({
      targets: '.ren-wrapper li',
      direction: 'alternate',
      loop: false,
      easing: 'easeOutExpo',
      delay: (el, index) => index * 50,
    })
    .add({
      scale: 0.9,
      opacity: 1,
    });
    clearTimeout(timer);
    timer = null;
  }, config.page2.xiaoRenTime);

};

export const changePAGE9= (type) => {
  const list = ['w-left-bar', 'w-right-bar', 'w-up-right-arrow'];
  const $list = document.querySelectorAll(`.${list[0]},.${list[1]},.${list[2]}`);
  forEach.call($list, dom => dom.classList.remove('change'));

  if(type == 'before') return;
  list.forEach(key => {
    let timer = setTimeout(()=> {
      if(!document.querySelector('.page-9.cur')) return;
      document.querySelector(`.${key}`).classList.add('change');
      clearTimeout(timer);
      timer = null;
    }, config.page9.items[key].data.time);
  })
};

export const changePAGE11 = (type) => {
  const list = ['w-left-bar-1', 'w-right-bar-1', 'w-up-right-arrow-1'];
  const $list = document.querySelectorAll(`.${list[0]},.${list[1]},.${list[2]}`);
  forEach.call($list, dom => dom.classList.remove('change'));

  if(type == 'before') return;
  list.forEach(key => {
    let timer = setTimeout(()=> {
      if(!document.querySelector('.page-11.cur')) return;
      document.querySelector(`.${key}`).classList.add('change');
      clearTimeout(timer);
      timer = null;
    }, config.page11.items[key].data.time);
  })
};

let page13Slider = null;
export const changePAGE13 = (type) => {
  const $page = document.querySelector('.page-13');
  const $ertong = $page.querySelector('.er-tong');
  const $left = $page.querySelector('.w-left-arrow');
  const $right = $page.querySelector('.w-right-arrow');
  let $outer = $page.querySelector('.tns-outer');


  if ($outer){
    $outer.style.cssText= 'opacity:0;';
    $ertong.style.cssText = 'opacity:1;';
    page13Slider && page13Slider.goTo('first');
  } else {
    let $wrapper = document.createElement('div');
    let html = `<div class="tupian-wrapper">`;
    let tp = '';
    for(let i = 0; i < 5; i++){
      tp += `<div class="tp tp-${i+1}" ></div>`;
    }
    html+= `${tp}\n</div>`;
    $wrapper.innerHTML = html;
    $page.appendChild($wrapper);

    page13Slider = window.tns({
      container: '.tupian-wrapper',
      items: 1,
      startIndex: 0,
      autoHeight: true,
    });

    $left.onclick = () => {
      document.querySelector('.tns-controls [data-controls="prev"]').click();
    }
    $right.onclick = () => {
      document.querySelector('.tns-controls [data-controls="next"]').click();
    }

  }
  if (type == 'before') return;

  let timer = setTimeout(()=> {
    $outer = $page.querySelector('.tns-outer');
    if (!$outer) return;
    $outer.style.cssText= 'opacity:1;';
    $ertong.style.cssText = 'display:none;';
    clearTimeout(timer);
    timer = null;
  }, config.page13.items['er-tong'].data.time + 1400);


}

export const changePAGE18 = (type) => {
  const $page = document.querySelector('.page-18');

  if (document.querySelector('.fz-wrapper')) {
    forEach.call(document.querySelectorAll('.fz-wrapper li'), dom => {
      dom.style.cssText = 'opacity:0;transform: rotate(0deg) translateY(0)';
    });
  } else {

    let $wrapper = document.createElement('div');
    let html = `<div class="fz-wrapper">`;
    let fz = `<ul>`;
    for(let i = 0; i < 5; i++){
      fz+= `<li class="w fz fz-${i+1}" ></li>`;
    }
    html+= `${fz}</ul></div>`;
    $wrapper.innerHTML = html;
    $page.appendChild($wrapper);
  }
  if (type == 'before') return;
  let timer = setTimeout(()=> {
    if(!document.querySelector('.page-18.cur')) return;
    anime.timeline({
      targets: '.fz-wrapper li',
      opacity: 1,
      direction: 'alternate',
      loop: false,
      easing: 'easeOutExpo',
      delay: (el, i) => i * 300 ,
      duration: 700,
    }).add({
      translateY: '-1rem',
      rotate: '360deg',
      opacity: 1,
    })
    clearTimeout(timer);
    timer = null;
  }, config.page18.fzTime);

};

