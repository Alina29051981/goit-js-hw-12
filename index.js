/* empty css                      */import{a as S,S as q,i as l}from"./assets/vendor-BDlA6vKe.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&p(h)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const P="51378857-ce26c557409bd50545eef808f",x="https://pixabay.com/api/",B=15;async function $(e,t=1,s=B){var o;const p={key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:t};try{return(await S.get(x,{params:p})).data}catch(r){throw new Error(`Failed to fetch images: ${((o=r.response)==null?void 0:o.statusText)||r.message}`)}}const d=document.querySelector(".gallery"),m=document.querySelector(".loader"),a=document.querySelector(".load-more");let c=null,i=null;function C(e){if(!d)return;const t=e.map(s=>`
    <li class="gallery-item">
      <a href="${s.largeImageURL}">
        <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy">
      </a>
      <div class="info-row">
        <div class="info-block">
          <span>Likes</span>
          <span>${s.likes}</span>
        </div>
        <div class="info-block">
          <span>Views</span>
          <span>${s.views}</span>
        </div>
        <div class="info-block">
          <span>Comments</span>
          <span>${s.comments}</span>
        </div>
        <div class="info-block">
          <span>Downloads</span>
          <span>${s.downloads}</span>
        </div>
      </div>
    </li>
  `).join("");if(d.insertAdjacentHTML("beforeend",t),c)c.refresh();else try{c=new q(".gallery a",{captionsData:"alt",captionDelay:250})}catch(s){console.error("SimpleLightbox initialization failed:",s)}}function L(){d&&(d.innerHTML="",c&&(c.destroy(),c=null))}function b(){m.textContent="Loading images, please wait...",m.classList.add("is-visible")}function v(){m.textContent="",m.classList.remove("is-visible")}function A(){var e;a&&(a.classList.add("hidden"),i||(i=document.createElement("div"),i.classList.add("load-more-loader"),i.textContent="Loading images, please wait...",(e=a.parentNode)==null||e.insertBefore(i,a.nextSibling)),i.classList.remove("hidden"))}function O(){a&&(a.classList.remove("hidden"),i&&i.classList.add("hidden"))}function T(){v(),d&&(d.innerHTML='<p class="no-results">No results found.</p>')}const M=document.querySelector(".form"),g=M.querySelector('input[name="search-text"]'),n=document.querySelector(".load-more");let u=1,E="",y=0;const w=15;function f(){n&&(n.classList.add("hidden"),n.style.display="none")}function k(){n&&(n.classList.remove("hidden"),n.style.display="inline-block")}g.addEventListener("input",()=>{if(g.value.trim()===""){L(),f(),v();const e=document.querySelector(".no-results");e&&e.remove(),l.destroy()}});M.addEventListener("submit",async e=>{e.preventDefault();const t=g.value.trim();if(!t){l.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}E=t,u=1,L(),f(),b(),await R(!0)});n.addEventListener("click",async()=>{if(u>=y){f();return}u++,n.disabled=!0,f(),A();try{await R(!1),H()}catch(e){l.error({title:"Error",message:e.message,position:"topRight"})}finally{O(),n.disabled=!1}});async function R(e=!1){try{e&&b();const t=await $(E,u,w);if(t.hits.length===0){e?(L(),T()):l.info({message:"No more images found.",position:"topRight"});return}y=Math.ceil(t.totalHits/w),C(t.hits),u<y?k():(f(),l.info({message:"You've reached the end of search results.",position:"topRight"}))}catch(t){l.error({title:"Error",message:t.message,position:"topRight"})}finally{e&&(await new Promise(t=>setTimeout(t,400)),v())}}function H(){const e=document.querySelector(".gallery-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
