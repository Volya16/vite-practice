import { UnsplashAPI } from "./UnsplashAPI";
import { renderCardGallery } from "./render-function"
import Pagination from 'tui-pagination'; 
import "tui-pagination/dist/tui-pagination.min.css"

const galleryListEl = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

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

function paginationPopular(event) {
    const currentPage = event.page;
    api.getPopularPhotos(currentPage).then((data) => {
        galleryListEl.innerHTML = renderCardGallery(data.results);
    })
    }
pagination.on('afterMove', paginationPopular );

function paginationByQuery(event) { 
    const currentPage = event.page;
    api.getPhotosByQuery(currentPage).then((data) => {
        galleryListEl.innerHTML = renderCardGallery(data.results);
    })
}
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();
    if (searchQuery === '') { 
        return;
    }
    api.query = searchQuery;
    pagination.off('afterMove', paginationPopular);
    pagination.off('afterMove', paginationByQuery);
    try {
        const data = await api.getPhotosByQuery(page);
        galleryListEl.innerHTML = renderCardGallery(data.results);
        pagination.reset(data.total)
        pagination.on('afterMove',paginationByQuery);
    }

    catch (error) {
        console.log(error);
    } 
    
 });
