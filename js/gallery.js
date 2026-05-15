import images from './data.js';

const classNameModal= 'modal';
const classNameModalImage = 'modal-image';
const classNameGallery = 'gallery';
const classNameGalleryItem = 'gallery-item';
const classNameGalleryLink = 'gallery-link';
const classNameGalleryImage = 'gallery-image';

const gallery = document.querySelector(`.${classNameGallery}`);

const markup = images.map(({preview, original, description}) => {
  return `
    <li class="${classNameGalleryItem}">
      <a class="${classNameGalleryLink}" href="${original}">
        <img
          class="${classNameGalleryImage}"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
});

gallery.insertAdjacentHTML('beforeend', markup.join(''));

gallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.classList.contains(`${classNameGalleryImage}`)) {
    openModal(event.target.dataset.source);
  }
});

gallery.addEventListener('keydown', event => {
  const target = event.target;
  if (!target || !(target instanceof Element)) {
    return;
  }

  if (event.code === 'Enter' ||
      event.code === 'NumpadEnter' ||
      event.code === 'Space') {
    const modal = document.querySelector(`.${classNameModal}`);
    if (!modal) {
      const clickedItem = event.target.closest(`.${classNameGalleryItem}`);
      if (clickedItem) {
        const targetImg = event.target.querySelector(`.${classNameGalleryImage}`);
        if (targetImg) {
          event.preventDefault();
          openModal(targetImg.dataset.source);
        }
      }
    }
  }
});

function openModal(src) {
  const instance = basicLightbox.create(
    `
    	<img class="${classNameModalImage}" src="${src}">
    `,
    {
      className: `${classNameModal}`,

      onShow: instance => {
        document.addEventListener('keydown', onEscapePress);
      },

      onClose: instance => {
        document.removeEventListener('keydown', onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
