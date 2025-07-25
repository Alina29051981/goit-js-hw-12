/* empty css                      */import{a as R,S as $,i as a}from"./assets/vendor-BDlA6vKe.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const x="51378857-ce26c557409bd50545eef808f",B="https://pixabay.com/api/";async function S(e,n=1,t=9){var o;const d={key:x,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:n};try{return(await R.get(B,{params:d})).data}catch(r){throw new Error(`Failed to fetch images: ${((o=r.response)==null?void 0:o.statusText)||r.message}`)}}const p=document.querySelector(".gallery"),c=document.querySelector(".loader"),s=document.querySelector(".load-more");let g=null,i=null;function v(e){e&&e.classList.remove("hidden")}function w(e){e&&e.classList.add("hidden")}function M(e){if(!p)return;const n=e.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy">
      </a>
      <div class="info-row">
        <div class="info-block">
          <span>Likes</span>
          <span>${t.likes}</span>
        </div>
        <div class="info-block">
          <span>Views</span>
          <span>${t.views}</span>
        </div>
        <div class="info-block">
          <span>Comments</span>
          <span>${t.comments}</span>
        </div>
        <div class="info-block">
          <span>Downloads</span>
          <span>${t.downloads}</span>
        </div>
      </div>
    </li>
  `).join("");if(p.insertAdjacentHTML("beforeend",n),g)g.refresh();else try{g=new $(".gallery a",{captionsData:"alt",captionDelay:250})}catch(t){console.error("SimpleLightbox initialization failed:",t)}}function P(){p&&(p.innerHTML="")}function C(){c&&(c.textContent="Loading images, please wait...",v(c))}function b(){c&&w(c)}function q(){s&&(v(s),i&&(i.remove(),i=null))}function u(){s&&w(s)}function N(){s&&(w(s),i||(i=document.createElement("div"),i.classList.add("load-more-message"),i.textContent="Loading images, please wait...",s.parentNode&&s.parentNode.insertBefore(i,s.nextSibling)))}function f(){i&&(i.remove(),i=null),s&&v(s)}const E=document.querySelector(".form"),H=E.querySelector('input[name="search-text"]'),O=document.querySelector(".load-more"),T=document.querySelector(".gallery");let l=1,h="",y=0;const L=9;E.addEventListener("submit",async e=>{e.preventDefault();const n=H.value.trim();if(!n){a.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}h=n,l=1,P(),u(),C();try{const t=await S(h,l,L);if(t.hits.length===0){T.innerHTML='<p class="no-results">No results found.</p>',b(),u();return}M(t.hits),y=Math.ceil(t.totalHits/L),a.success({message:`Found ${t.totalHits} images.`,position:"topRight"}),l>=y?(u(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):q()}catch(t){a.error({title:"Error",message:t.message,position:"topRight"})}finally{b()}});O.addEventListener("click",async()=>{l++,u(),N();try{const e=await S(h,l,L);if(e.hits.length===0){f(),a.info({message:"No more images found.",position:"topRight"});return}M(e.hits),k(),l>=y?(f(),u(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):(f(),q())}catch(e){f(),a.error({title:"Error",message:e.message,position:"topRight"})}});function k(){const e=document.querySelector(".gallery-item");if(!e)return;const{height:n}=e.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
