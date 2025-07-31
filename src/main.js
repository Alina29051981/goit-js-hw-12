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
} from './js/render-functions.js';

// DOM-елементи
const form = document.querySelector('.form'); // Форма пошуку
const input = form.querySelector('input[name="search-text"]'); // Поле для пошуку
const loadMoreBtn = document.querySelector('.load-more'); // Кнопка "Load More"

// Змінні для пагінації та запиту
let currentPage = 1;
let currentQuery = '';
let totalPages = 0;
const perPage = 15;

// Обробник сабміту форми пошуку
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

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      hideLoader();
      clearGallery();
      hideLoadMoreButton();
      iziToast.info({
        message: 'No results found.',
        position: 'topRight',
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / perPage);
    createGallery(data.hits);

    if (data.totalHits > perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

// Обробник кліку на кнопку Load More
loadMoreBtn.addEventListener('click', async () => {
  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    return;
  }

  currentPage++;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      showLoadMoreButton();
    }

    const firstCard = document.querySelector('.gallery-item');
    if (!firstCard) return;

    const { height: cardHeight } = firstCard.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });

    if (currentPage < totalPages) {
      showLoadMoreButton();
    }
  } finally {
    hideLoader();
  }
});
