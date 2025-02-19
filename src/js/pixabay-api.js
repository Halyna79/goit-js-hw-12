import axios from 'axios';

const API_KEY = '48848335-f5abf64d59c2aabc1155fb6ba';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 40) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                Image_type: 'photo',
                orientation: 'horisontal',
                safesearch: true,
                page,
                per_page: perPage
            },
        });
        return response.data;
    } catch (error) {
      console.error('Sorry, there are no images matching your search query. Please try again!', error);  
  }
}