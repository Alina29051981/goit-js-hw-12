import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = null;
let loadMoreMessageElem = null;

function showElement(element) {
  if (!element) return;
  element.classList.remove('hidden');
}

function hideElement(element) {
  if (!element) return;
  element.classList.add('hidden');
}

export function checkPageLimits(currentPage, totalPages) {
  if (currentPage >= totalPages) {
    hideElement(loadMoreBtn);
    hideElement(loader);
    if (loadMoreMessageElem) {
      loadMoreMessageElem.remove();
      loadMoreMessageElem = null;
    }
    return true;
  }
  return false;
}

export function createGallery(images) {
  if (!galleryContainer) return;

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
    try {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } catch (error) {
      console.error('SimpleLightbox initialization failed:', error);
    }
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
  loader.textContent = 'Loading images, please wait...';
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.textContent = '';
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  showElement(loadMoreBtn);
  if (loadMoreMessageElem) {
    loadMoreMessageElem.remove();
    loadMoreMessageElem = null;
  }
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  hideElement(loadMoreBtn);
}

export function showLoadMoreLoader() {
  if (!loadMoreBtn) return;

  loadMoreBtn.classList.add('hidden'); 

  if (!loadMoreMessageElem) {
    loadMoreMessageElem = document.createElement('div');
    loadMoreMessageElem.classList.add('load-more-loader');
    loadMoreMessageElem.textContent = 'Loading images, please wait...';

    loadMoreBtn.parentNode?.insertBefore(loadMoreMessageElem, loadMoreBtn.nextSibling);
  }

  loadMoreMessageElem.classList.remove('hidden');
}

export function hideLoadMoreLoader() {
  if (!loadMoreBtn) return;

  loadMoreBtn.classList.remove('hidden');

  if (loadMoreMessageElem) {
    loadMoreMessageElem.classList.add('hidden');
  }
}

export function showNoResultsMessage() {
  hideLoader(); 

  if (!galleryContainer) return;
  galleryContainer.innerHTML = '<p class="no-results">No results found.</p>';
}
