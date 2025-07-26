import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreLoader,
  hideLoadMoreLoader,
  showNoResultsMessage,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalPages = 0;
const perPage = 9;

function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('hidden');
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('hidden');
  loadMoreBtn.style.display = 'inline-block'; // або 'block' за потреби
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  await fetchAndRenderImages(true);
});

loadMoreBtn.addEventListener('click', async () => {
  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    return;
  }

  currentPage++;
  loadMoreBtn.disabled = true;
  hideLoadMoreButton();
  showLoadMoreLoader();

  await fetchAndRenderImages(false);

  hideLoadMoreLoader();
  loadMoreBtn.disabled = false;

  smoothScroll();
});

async function fetchAndRenderImages(isNewSearch = false) {
  try {
    if (isNewSearch) showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      if (isNewSearch) {
        clearGallery();
        showNoResultsMessage();
      }
      iziToast.info({ message: "No more images found.", position: 'topRight' });
      return;
    }

    totalPages = Math.ceil(data.totalHits / perPage);

    createGallery(data.hits);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    if (isNewSearch) {
      await new Promise(resolve => setTimeout(resolve, 400));
      hideLoader();
    }
  }
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
