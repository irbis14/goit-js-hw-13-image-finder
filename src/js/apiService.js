const BASE_URL = 'https://pixabay.com/api/';
const KEY = '21304546-dfd139bdae93d70ad7d2573af';

export default class PicturesApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImage() {
    const response = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    );
    if (!response.ok) {
      throw response;
    }
    const result = await response.json();
    this.incrementPage();

    return result;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
