/**
 * smooth-scroll.js — плавный скролл через Lenis.
 *
 * Что делает: заменяет нативный скролл браузера на инерционный,
 * с плавным замедлением. Ощущение — как будто страница «плывёт».
 *
 * Подключается НЕ на всех страницах — только на контентных
 * (about, skills, кейсы). На главной index.html НЕ подключать:
 * там свой scroll-snap магнит (см. project-scroll.js), и они
 * будут конфликтовать.
 *
 * Требует Lenis, подключённый через CDN ПЕРЕД этим файлом.
 * Уважает prefers-reduced-motion: если пользователь отключил
 * анимации в системе — Lenis не включается, остаётся нативный скролл.
 */

(function () {
  // Уважение к настройкам доступности
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Проверяем, что библиотека загрузилась
  if (typeof window.Lenis === 'undefined') {
    console.warn('[smooth-scroll] Lenis not loaded, using native scroll.');
    return;
  }

  const lenis = new window.Lenis({
    duration: 1.2,           // «вязкость» скролла: 1.0 = норм, 1.4 = очень плавно
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // плавный ease-out
    smoothWheel: true,       // плавный скролл колёсиком мыши
    smoothTouch: false,      // на тач-устройствах — нативный скролл (иначе лагает)
    wheelMultiplier: 1,      // чувствительность колёсика
    touchMultiplier: 1.5,    // для мобилки, если smoothTouch: true
  });

  // Запускаем цикл анимации — Lenis обновляет свою позицию в rAF
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Помогаем якорным ссылкам (#cv, #contact и т.п.) работать
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 }); // отступ сверху под хедер
    });
  });
})();