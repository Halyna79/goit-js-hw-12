import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader");

let query = "";
let page = 1;
const perPage = 40;
let totalHits = 0;
let lightbox = new SimpleLightbox('.gallery a');
const button = document.querySelector("button[type='submit']");

loadMoreBtn.style.display = "none";
loader.style.display = "none";

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    query = event.target.elements.searchQuery.value.trim();
    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            position: "topRight",
        });
        return;
    }
    page = 1;
    gallery.innerHTML = "";
    
    loadMoreBtn.style.display = "none";
    loader.style.display = "block";

    try {
        const data = await fetchImages(query, page, perPage);
        totalHits = data.totalHits || 0;

        if (data.hits.length === 0) {
            iziToast.info({
                title: "Info",
                message: "No results found. Try another search query!",
                position: "topRight",
            });
            return;
        }
        gallery.innerHTML = renderImages(data.hits);
        lightbox.refresh();
        searchForm.reset();
        
        if (page * perPage < totalHits) {
            loadMoreBtn.style.display = "block";
            // loader.style.display = "block";
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong! Please try again.",
            position: "topRight",
        });
    } finally {
        loader.style.display = "none";
    }
});

loadMoreBtn.addEventListener("click", async () => {
    page++;
    loadMoreBtn.style.display = "none";
    loader.style.display = "block";
    try {
        const data = await fetchImages(query, page, perPage);
        if (data.hits.length === 0) {
            iziToast.info({
                title: "Info",
                message: "No results found. Try another search query!",
                position: "topRight",
            });
            return;
        }

        gallery.insertAdjacentHTML("beforeend", renderImages(data.hits));
        lightbox.refresh();

        const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 3,
            behavior: "smooth"
        });

        if (page * perPage >= totalHits) {
            iziToast.info({
                title: "End or collection",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
            loadMoreBtn.style.display = "none";
            loader.style.display = "none";
        } else {
            loadMoreBtn.style.display = "none";
            loader.style.display = "block";
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong! Please try again.",
            position: "topRight",
        });
    } finally {
        loader.style.display = "none";
    }
});