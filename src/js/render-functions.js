import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
// DOM елементи
const galleryContainer = document.querySelector('.gallery'); // Контейнер для картинок
const loader = document.querySelector('.loader');           // Текст лоадера (показує "завантаження")
const loadMoreBtn = document.querySelector('.load-more');    // Кнопка "Завантажити ще"

let lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
// Текст біля кнопки "Завантажити ще", коли йде завантаження


// ЗАПОВНИТИ галерею картинками
export function createGallery(images) {
  if (!galleryContainer) return;

  // Для кожної картинки робимо HTML блок з даними
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

  // Вставляємо картки в галерею
  galleryContainer.insertAdjacentHTML('beforeend', markup);


    lightbox.refresh();
  }


// ОЧИСТИТИ галерею (прибрати всі картинки)
export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = ''; // прибрати все з галереї
  if (lightbox) {
    lightbox.destroy(); // прибрати лайтбокс
    lightbox = null;
  }
}

// ПОКАЗАТИ великий лоадер (пишемо "завантаження...")
export function showLoader() {
  if (!loader) return;
  loader.textContent = 'Loading images, please wait...';
  loader.classList.add('is-visible');
}

// СХОВАТИ великий лоадер (очистити текст і приховати)
export function hideLoader() {
  if (!loader) return;
  loader.textContent = '';
  loader.classList.remove('is-visible');
}

// ПОКАЗАТИ кнопку "Load More"
export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('hidden'); 

  // Якщо поруч був лоадер кнопки — видаляємо його
 
}

// СХОВАТИ кнопку "Load More"
export function hideLoadMoreButton() {
 if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('hidden'); 
}
