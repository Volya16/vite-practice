import iziToast from 'izitoast';
import { UnsplashAPI } from './UnsplashAPI';
import { renderCardGallery } from './render-function';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import icon from '../img/javascript.svg';
import 'izitoast/dist/css/iziToast.min.css';

const galleryListEl = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

const api = new UnsplashAPI();

const container = document.getElementById('tui-pagination-container');
const options = {
  // below default value of options
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

api.getPopularPhotos(page).then(data => {
  galleryListEl.innerHTML = renderCardGallery(data.results);
  pagination.reset(data.total);
});

function paginationPopular(event) {
  const currentPage = event.page;
  api.getPopularPhotos(currentPage).then(data => {
    galleryListEl.innerHTML = renderCardGallery(data.results);
  });
}
pagination.on('afterMove', paginationPopular);

function paginationByQuery(event) {
  const currentPage = event.page;
  api.getPhotosByQuery(currentPage).then(data => {
    galleryListEl.innerHTML = renderCardGallery(data.results);
  });
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value.trim();
  if (searchQuery === '') {
    return;
  }
  api.query = searchQuery;
  loader.classList.remove('is-hidden');
  pagination.off('afterMove', paginationPopular);
  pagination.off('afterMove', paginationByQuery);
  try {
    const data = await api.getPhotosByQuery(page);
    if (data.results.length === 0) {
      iziToast.info({
        message: 'Try another query',
        iconUrl: icon,
      });
      container.classList.add('is-hidden');
      return;
    }
    galleryListEl.innerHTML = renderCardGallery(data.results);
    if (data.total <= 12) {
      container.classList.add('is-hidden');
    } else {
      container.classList.remove('is-hidden');
    }
    pagination.reset(data.total);
    pagination.on('afterMove', paginationByQuery);
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('is-hidden');
  }
});
