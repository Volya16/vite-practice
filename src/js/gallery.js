import { UnsplashAPI } from "./UnsplashAPI";
import { renderCardGallery } from "./render-function"
import Pagination from 'tui-pagination'; 
import "tui-pagination/dist/tui-pagination.min.css"

const galleryListEl = document.querySelector('.gallery');

const api = new UnsplashAPI();

const container = document.getElementById('tui-pagination-container');
const options = { // below default value of options
    totalItems: 0,
    itemsPerPage: 12,
    visiblePages: 5,
    page: 1,
}

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

api.getPopularPhotos(page).then((data) => {
    galleryListEl.innerHTML = renderCardGallery(data.results);
    pagination.reset(data.total)
});

