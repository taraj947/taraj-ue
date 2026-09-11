import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Field order is always image, eyebrow, text: the eyebrow is the first
    // wrapper that isn't the image wrapper.
    const imageWrapper = [...li.children].find((div) => div.querySelector('picture'));
    const eyebrowWrapper = [...li.children].find((div) => div !== imageWrapper);
    const eyebrowText = eyebrowWrapper?.textContent.trim();
    if (eyebrowWrapper) eyebrowWrapper.remove();

    [...li.children].forEach((div) => {
      div.className = div === imageWrapper ? 'cards-card-image' : 'cards-card-body';
    });

    // Add eyebrow span above card body content
    if (eyebrowText) {
      const cardBody = li.querySelector('.cards-card-body');
      const span = document.createElement('span');
      span.classList.add('card-eyebrow');
      span.textContent = eyebrowText;
      if (cardBody) cardBody.insertBefore(span, cardBody.firstElementChild);
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
}
