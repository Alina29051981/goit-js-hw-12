/* empty css                      */import{a as S,S as q,i as u}from"./assets/vendor-BDlA6vKe.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const x="51378857-ce26c557409bd50545eef808f",P="https://pixabay.com/api/";async function R(o,e=1,r=9){var t;const d={key:x,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:e};try{return(await S.get(P,{params:d})).data}catch(s){throw new Error(`Failed to fetch images: ${((t=s.response)==null?void 0:t.statusText)||s.message}`)}}const l=document.querySelector(".gallery"),f=document.querySelector(".loader"),a=document.querySelector(".load-more");let h=null,i=null;function B(o){if(!l)return;const e=o.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
        <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy">
      </a>
      <div class="info-row">
        <div class="info-block">
          <span>Likes</span>
          <span>${r.likes}</span>
        </div>
        <div class="info-block">
          <span>Views</span>
          <span>${r.views}</span>
        </div>
        <div class="info-block">
          <span>Comments</span>
          <span>${r.comments}</span>
        </div>
        <div class="info-block">
          <span>Downloads</span>
          <span>${r.downloads}</span>
        </div>
      </div>
    </li>
  `).join("");if(l.insertAdjacentHTML("beforeend",e),h)h.refresh();else try{h=new q(".gallery a",{captionsData:"alt",captionDelay:250})}catch(r){console.error("SimpleLightbox initialization failed:",r)}}function L(){l&&(l.innerHTML="")}function v(){f.textContent="Loading images, please wait...",f.classList.add("is-visible")}function E(){f.textContent="",f.classList.remove("is-visible")}function $(){var o;a&&(a.classList.add("hidden"),i||(i=document.createElement("div"),i.classList.add("load-more-loader"),i.textContent="Loading images, please wait...",(o=a.parentNode)==null||o.insertBefore(i,a.nextSibling)),i.classList.remove("hidden"))}function C(){a&&(a.classList.remove("hidden"),i&&i.classList.add("hidden"))}function O(){l.innerHTML='<p class="no-results">No results found.</p>'}const w=document.querySelector(".form"),T=w.querySelector('input[name="search-text"]'),n=document.querySelector(".load-more");let c=1,b="",g=0;const y=9;function p(){n&&(n.classList.add("hidden"),n.style.display="none")}function k(){n&&(n.classList.remove("hidden"),n.style.display="inline-block")}w.addEventListener("submit",async o=>{o.preventDefault();const e=T.value.trim();if(!e){u.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}b=e,c=1,L(),p(),v(),await M(!0)});n.addEventListener("click",async()=>{if(c>=g){p();return}c++,n.disabled=!0,p(),$(),await M(!1),C(),n.disabled=!1,A()});async function M(o=!1){try{o&&v();const e=await R(b,c,y);if(e.hits.length===0){o&&(L(),O()),u.info({message:"No more images found.",position:"topRight"});return}g=Math.ceil(e.totalHits/y),B(e.hits),c<g?k():(p(),u.info({message:"You've reached the end of search results.",position:"topRight"}))}catch(e){u.error({title:"Error",message:e.message,position:"topRight"})}finally{o&&(await new Promise(e=>setTimeout(e,400)),E())}}function A(){const o=document.querySelector(".gallery-item");if(!o)return;const{height:e}=o.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
