import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

form.addEventListener('submit', event => {
  event.preventDefault();

  gallery.innerHTML = '';
  loader.style.display = 'block';

  const params = new URLSearchParams({
    key: '52281373-9c637a03bb3ab255d1364f6e9',
    q: form.querySelector('.search-input').value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  fetch(`https://pixabay.com/api/?${params}`)
    .then(response => response.json())
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      gallery.innerHTML = data.hits
        .map(
          hit => `<div class="card">
            <a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}"/></a>
            <div class="card-info">
              <span><b>Likes</b>: ${hit.likes}</span>
              <span><b>Views</b>: ${hit.views}</span>
              <span><b>Comments</b>: ${hit.comments}</span>
              <span><b>Downloads</b>: ${hit.downloads}</span>
            </div>
          </div>`
        )
        .join('');

      var simple = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      simple.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.style.display = 'none';
    });
});
