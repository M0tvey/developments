// ------------------------------------ start custom cursor ------------------------------------
(function () {
  setTimeout(() => {
    const cursor = document.createElement('div'),
      cursorFollow = document.createElement('div'),
      bodyEl = document.body,
      cursorClass = 'cursor',
      cursorFollowClass = 'cursor_follow',
      cursorsSettings = (el, elClass) => {
        el.classList.add(elClass);
        el.style.top = '0px';
        el.style.left = '0px';
        bodyEl.appendChild(el);

      },
      cursorAddCords = (el, ev) => {
        el.style.top = `${ev.pageY}px`;
        el.style.left = `${ev.pageX}px`;
      },
      addEventsOnLinks = () => {
        document.querySelectorAll('a, button, [class*="blocker"]').forEach(el => {
          el.addEventListener('mouseover', () => {
            cursorEl.classList.add('hover');
            cursorFollowEl.classList.add('hover');
          });
          el.addEventListener('mouseout', () => {
            cursorEl.classList.remove('hover');
            cursorFollowEl.classList.remove('hover');
          });
        });
      };

    cursorsSettings(cursor, cursorClass);
    cursorsSettings(cursorFollow, cursorFollowClass);

    const cursorEl = document.querySelector(`.${cursorClass}`),
      cursorFollowEl = document.querySelector(`.${cursorFollowClass}`);

    bodyEl.classList.add('cursor_ready');

    bodyEl.addEventListener('mousemove', e => {
      if (e.target.localName == 'ymaps' || e.target.className.indexOf('fancybox') != -1) {
        cursor.classList.add('none');
      } else {
        cursor.classList.remove('none');
      }

      cursorAddCords(cursorEl, e);
      setTimeout(() => { cursorAddCords(cursorFollowEl, e) }, 80);
    });

    addEventsOnLinks();
    document.addEventListener('click', () => { setTimeout(() => { addEventsOnLinks() }, 310) });
  }, 300)
}());
// ------------------------------------- end custom cursor -------------------------------------