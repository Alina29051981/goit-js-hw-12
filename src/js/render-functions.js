import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery'); 
const loader = document.querySelector('.loader');  
const loadMoreBtn = document.querySelector('.load-more'); 
  
let lightbox = null;

export function createGallery(images) {
       const markup = images.map(image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="info-row">
        <div class="info-block"><span>Likes</span><span>${image.likes}</span></div>
        <div class="info-block"><span>Views</span><span>${image.views}</span></div>
        <div class="info-block"><span>Comments</span><span>${image.comments}</span></div>
        <div class="info-block"><span>Downloads</span><span>${image.downloads}</span></div>
      </div>
    </li>
  `).join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
 } else {
    lightbox.refresh();
    }
  }

export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = ''; 
  if (lightbox) {
    lightbox.destroy(); 
    lightbox = null;
  }
}

export function showLoader() {
  if (!loader) return;
  loader.textContent = 'Loading images, please wait...';
  loader.classList.add('is-visible');
  }

export function hideLoader() {
  if (!loader) return;
  loader.textContent = '';
  loader.classList.remove('is-visible');
}
  
 

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('hidden'); 
}

export function hideLoadMoreButton() {
 if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('hidden'); 
}
