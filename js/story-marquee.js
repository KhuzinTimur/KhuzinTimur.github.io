/**
 * story-marquee.js — full-bleed для карусели фото.
 *
 * Карусель лежит внутри grid-колонки, сдвинутой вправо. Обычный
 * margin-left: calc(50% - 50vw) не работает — 50% берётся от ширины
 * родителя, а не от viewport, и карусель не доходит до левого края экрана.
 *
 * Решение: замеряем фактическую позицию родителя через getBoundingClientRect
 * и выставляем margin-left + width так, чтобы карусель растянулась
 * от левого до правого края экрана — независимо от разрешения.
 */

(function () {
  const marquee = document.querySelector('.story-marquee');
  if (!marquee) return;

  function applyFullBleed() {
    const parent = marquee.parentElement;
    if (!parent) return;

    // Сбрасываем, чтобы измерить естественную позицию
    marquee.style.marginLeft = '';
    marquee.style.width = '';

    const parentRect = parent.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;

    marquee.style.marginLeft = `${-parentRect.left}px`;
    marquee.style.width = `${viewportWidth}px`;
  }

  applyFullBleed();
  window.addEventListener('resize', applyFullBleed);
  window.addEventListener('load', applyFullBleed);
})();