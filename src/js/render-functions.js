import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

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
  if (!document.querySelector('#loading-message')) {
    document.body.insertAdjacentHTML('beforeend', `
      <p id="loading-message" style="
        text-align: center;
        font-size: 16px;
        color: #2e2f42;
        margin: 20px auto;
      ">
        Loading images, please wait...
      </p>
    `);
  }
}

export function hideLoader() {
  const message = document.querySelector('#loading-message');
  if (message) {
    message.remove();
  }
}

