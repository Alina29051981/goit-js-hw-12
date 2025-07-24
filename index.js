/* empty css                      */import{a as u,S as f,i as a}from"./assets/vendor-BDlA6vKe.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const m="51378857-ce26c557409bd50545eef808f",y="https://pixabay.com/api/";async function g(o){const s={key:m,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await u.get(y,{params:s})).data}catch{throw new Error("Failed to fetch images. Please try again later.")}}const d=document.querySelector(".gallery"),n=document.querySelector(".loader");let l=null;function h(o){const s=o.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy">
      </a>
      <div class="info-row">
        <div class="info-block">
          <span>Likes</span>
          <span>${e.likes}</span>
        </div>
        <div class="info-block">
          <span>Views</span>
          <span>${e.views}</span>
        </div>
        <div class="info-block">
          <span>Comments</span>
          <span>${e.comments}</span>
        </div>
        <div class="info-block">
          <span>Downloads</span>
          <span>${e.downloads}</span>
        </div>
      </div>
    </li>
  `).join("");d.insertAdjacentHTML("beforeend",s),l?l.refresh():l=new f(".gallery a")}function v(){d.innerHTML=""}function L(){n.textContent="Loading images, please wait...",n.classList.add("is-visible")}function b(){n.textContent="",n.classList.remove("is-visible")}const p=document.querySelector(".form"),w=p.querySelector('input[name="search-text"]');p.addEventListener("submit",async o=>{o.preventDefault();const s=w.value.trim();if(!s){a.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}v(),L();try{const e=await g(s);e.hits.length===0?a.info({title:"Sorry",message:"There are no images matching your search query. Please try again!",position:"topRight"}):h(e.hits)}catch(e){a.error({title:"Error",message:e.message,position:"topRight"})}finally{b()}});
//# sourceMappingURL=index.js.map
