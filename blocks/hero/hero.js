/**
 * loads and decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Add eyebrow span above the heading content
  const eyebrow = block.querySelector('[data-aue-prop="eyebrow"]');
  if (eyebrow && eyebrow.textContent.trim()) {
    const span = document.createElement('span');
    span.classList.add('hero-eyebrow');
    span.textContent = eyebrow.textContent.trim();
    let eyebrowWrapper = eyebrow;
    while (eyebrowWrapper.parentElement !== block) eyebrowWrapper = eyebrowWrapper.parentElement;
    block.insertBefore(span, eyebrowWrapper);
    eyebrowWrapper.remove();
  }
}
