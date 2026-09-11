/**
 * loads and decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Field order is always image, eyebrow, text: the image wrapper contains
  // the picture, and the eyebrow is the first wrapper that isn't the image.
  const wrappers = [...block.children];
  const imageWrapper = wrappers.find((div) => div.querySelector('picture'));
  const eyebrowWrapper = wrappers.find((div) => div !== imageWrapper);
  const textWrapper = wrappers.find((div) => div !== imageWrapper && div !== eyebrowWrapper);
  const eyebrowText = eyebrowWrapper?.textContent.trim();

  if (eyebrowWrapper && textWrapper && eyebrowText) {
    const span = document.createElement('span');
    span.classList.add('hero-eyebrow');
    span.textContent = eyebrowText;
    textWrapper.firstElementChild.prepend(span);
    eyebrowWrapper.remove();
  }
}
