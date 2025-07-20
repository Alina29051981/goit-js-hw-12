import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox = null;

export function createGallery(images) {
  const markup = images.map(image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="info-row">
        <div class="info-block">
          <span>Likes</span>
          <span>${image.likes}</span>
        </div>
        <div class="info-block">
          <span>Views</span>
          <span>${image.views}</span>
        </div>
        <div class="info-block">
          <span>Comments</span>
          <span>${image.comments}</span>
        </div>
        <div class="info-block">
          <span>Downloads</span>
          <span>${image.downloads}</span>
        </div>
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
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.textContent = 'Loading images, please wait...';
  loader.style.display = 'inline-block';
}

export function hideLoader() {
  loader.textContent = '';
  loader.style.display = 'none';
}


