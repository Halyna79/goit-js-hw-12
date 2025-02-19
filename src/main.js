import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector(".load-more");

loadMoreBtn.style.display = "none";

let query = "";
let page = 1;
const perPage = 40;
let lightbox = new SimpleLightbox('.gallery a');

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
    loadMoreBtn.hidden = true;
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
        gallery.innerHTML = renderImages(data.hits);
        lightbox.refresh();
        if (data.hits.length === perPage) {
            // loadMoreBtn.hidden = false;
            loadMoreBtn.style.display = "block";
        }
        searchForm.reset();
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong! Please try again.",
            position: "topRight",
        });
    }
});

loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    try {
        const data = await fetchImages(query, page, perPage);
        if (data.hits.length === 0) {
            loadMoreBtn.hidden = true;
            iziToast.info({
                title: "Info",
                message: "No results found. Try another search query!",
                position: "topRight",
            });
            return;
        }
        gallery.insertAdjacentHTML("beforeend", renderImages(data.hits));
        lightbox.refresh();
        const { height: cardHeight } = document.querySelector(".gallery a").getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
        if (page * perPage >= data.totalHits) {
            // loadMoreBtn.hidden = true;
            loadMoreBtn.style.display = "none";
            iziToast.info({
                title: "End or collection",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong! Please try again.",
            position: "topRight",
        });
    }
});