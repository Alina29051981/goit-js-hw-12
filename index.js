/* empty css                      */import{a as q,S as x,i as d}from"./assets/vendor-BDlA6vKe.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))f(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&f(h)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const R="51378857-ce26c557409bd50545eef808f",E="https://pixabay.com/api/";async function P(t,e=1,s=9){var o;const f={key:R,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:e};try{return(await q.get(E,{params:f})).data}catch(r){throw new Error(`Failed to fetch images: ${((o=r.response)==null?void 0:o.statusText)||r.message}`)}}const c=document.querySelector(".gallery"),p=document.querySelector(".loader"),a=document.querySelector(".load-more");let l=null,i=null;function B(t){if(!c)return;const e=t.map(s=>`
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
  `).join("");if(c.insertAdjacentHTML("beforeend",e),l)l.refresh();else try{l=new x(".gallery a",{captionsData:"alt",captionDelay:250})}catch(s){console.error("SimpleLightbox initialization failed:",s)}}function L(){c&&(c.innerHTML="",l&&(l.destroy(),l=null))}function v(){p.textContent="Loading images, please wait...",p.classList.add("is-visible")}function w(){p.textContent="",p.classList.remove("is-visible")}function $(){var t;a&&(a.classList.add("hidden"),i||(i=document.createElement("div"),i.classList.add("load-more-loader"),i.textContent="Loading images, please wait...",(t=a.parentNode)==null||t.insertBefore(i,a.nextSibling)),i.classList.remove("hidden"))}function C(){a&&(a.classList.remove("hidden"),i&&i.classList.add("hidden"))}function O(){w(),c&&(c.innerHTML='<p class="no-results">No results found.</p>')}const b=document.querySelector(".form"),T=b.querySelector('input[name="search-text"]'),n=document.querySelector(".load-more");let u=1,M="",g=0;const y=15;function m(){n&&(n.classList.add("hidden"),n.style.display="none")}function k(){n&&(n.classList.remove("hidden"),n.style.display="inline-block")}b.addEventListener("submit",async t=>{t.preventDefault();const e=T.value.trim();if(!e){d.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}M=e,u=1,L(),m(),v(),await S(!0)});n.addEventListener("click",async()=>{if(u>=g){m();return}u++,n.disabled=!0,m(),$();try{await S(!1),A()}catch(t){d.error({title:"Error",message:t.message,position:"topRight"})}finally{C(),n.disabled=!1}});async function S(t=!1){try{t&&v();const e=await P(M,u,y);if(e.hits.length===0){t?(L(),O()):d.info({message:"No more images found.",position:"topRight"});return}g=Math.ceil(e.totalHits/y),B(e.hits),u<g?k():(m(),d.info({message:"You've reached the end of search results.",position:"topRight"}))}catch(e){d.error({title:"Error",message:e.message,position:"topRight"})}finally{t&&(await new Promise(e=>setTimeout(e,400)),w())}}function A(){const t=document.querySelector(".gallery-item");if(!t)return;const{height:e}=t.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
