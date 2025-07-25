import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoadMoreLoader,
  hideLoadMoreLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalPages = 0;
const perPage = 9;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query.', position: 'topRight' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      
  galleryContainer.innerHTML = '<p class="no-results">No results found.</p>';
  hideLoader();
  hideLoadMoreButton();
  return;
}

          createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / perPage);
    iziToast.success({ message: `Found ${data.totalHits} images.`, position: 'topRight' });

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;

  hideLoadMoreButton();
  showLoadMoreLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      hideLoadMoreLoader();
      iziToast.info({ message: "No more images found.", position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    smoothScroll();

    if (currentPage >= totalPages) {
      hideLoadMoreLoader();
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      hideLoadMoreLoader();
      showLoadMoreButton();
    }

  } catch (error) {
    hideLoadMoreLoader();
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  }
});

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
