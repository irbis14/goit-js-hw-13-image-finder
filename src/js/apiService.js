const BASE_URL = 'https://pixabay.com/api/';
const KEY = '21304546-dfd139bdae93d70ad7d2573af';

export default class PicturesApi {
  constructor() {
    this.searchQuery = '';
    // this.page = page;
  }
  // `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,

  async fetchCountry() {
    const response = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=&per_page=12&key=${KEY}`,
    );
    const picture = response.then(response => {
      if (!response.ok) {
        throw response;
      }
      return picture.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
