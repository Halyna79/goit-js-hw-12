import { comment } from "postcss";

export function renderImages(images) {
    return images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<div class="photo-card">
                    <a href="${largeImageURL}" class="gallery-link">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    </a>
                    <div class="info">
                        <p><strong>Likes:</strong> ${likes}</p>
                        <p><strong>Views:</strong> ${views}</p>
                        <p><strong>Comments:</strong> ${comments}</p>
                        <p><strong>Downloads:</strong> ${downloads}</p>
                    </div>
                </div>`
        )
        .join('');
}