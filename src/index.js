import './styles.css';
import PicturesApi from './js/apiService.js';
import imageCardTempl from './templates/image-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const imageListRef = document.querySelector('.gallery');
const inputRef = document.querySelector('input[name = "query"]');
const btnSearchRef = document.querySelector('.btn-search');
const btnLoadMoreRef = document.querySelector('.btn-load_more');

const pictturesApi = new PicturesApi();

btnSearchRef.addEventListener('click', onSearch);
btnLoadMoreRef.addEventListener('click', () => {
  windowsScrolling();
  loadMore();
});

async function onSearch(e) {
  e.preventDefault();
  clearRender();
  pictturesApi.query = inputRef.value.trim();

  if (pictturesApi.query === '') {
    loadMoreBtnHidden();
    return clearRender();
  }

  pictturesApi.resetPage();
  loadMore();
  loadMoreBtnActive();
}

async function loadMore() {
  try {
    const result = await pictturesApi.fetchImage();
    if (result.total !== 0) {
      renderImageCard(result);
    } else {
      loadMoreBtnHidden();
      onFetchError();
    }
  } catch {
    onFetchError();
  }
}

function renderImageCard(image) {
  const imageMarkup = imageCardTempl(image);
  imageListRef.insertAdjacentHTML('beforeend', imageMarkup);
}

function clearRender() {
  imageListRef.innerHTML = '';
}

function onFetchError() {
  error({
    title: 'Nothing found.',
    text: 'Please enter a more specific query.',
  });
}

function loadMoreBtnHidden() {
  btnLoadMoreRef.classList.add('is-hidden');
}

function loadMoreBtnActive() {
  btnLoadMoreRef.classList.remove('is-hidden');
}

function windowsScrolling() {
  const totalScrollHeight = document.body.clientHeight;
  window.scrollTo({
    top: totalScrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}
