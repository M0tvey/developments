// --------------------------- custom scroll ----------------------------------
function customScroll() {
  const blocks = document.querySelectorAll('.js_custom_scroll');
  if (!blocks.length) return;

  blocks.forEach(block => {
    $(block).mCustomScrollbar();
  });
}; customScroll();

// --------------------------- fade ----------------------------------
const fade = (effect, el, time = 5, callback) => {
  if (el == null) return;
  if (typeof time == 'function') time = callback;
  const isEffect = effect == 'out';
  let opacity = isEffect ? 1 : 0.01;

  if (!isEffect) el.style.display = "block";

  const timer = setInterval(() => {
    const isOpacityValue = isEffect ? opacity <= 0.1 : opacity >= 1;

    if (isOpacityValue) {
      clearInterval(timer);
      if (isEffect) el.remove();

      if (callback != undefined) callback();
    }

    el.style.opacity = opacity;

    isEffect ? opacity -= opacity * 0.1 : opacity += opacity * 0.1;
  }, time);
};

// --------------------------- preloader ----------------------------------
(_ => {
  window.showPreloader = _ => {
    const preClass = 'preloader_wrap';
    if (document.querySelector(`.${preClass}`)) return;

    const preWrap = document.createElement('div'),
      preImg = document.createElement('img');

    preWrap.className = preClass;
    preWrap.style.display = 'none';
    preImg.className = 'preloader';
    preImg.src = '/assets/img/svg/preloader.svg';

    preWrap.append(preImg);
    document.body.append(preWrap);

    fade('in', preWrap);

    preWrap.addEventListener('click', function (e) {
      e.preventDefault();
      fade('out', this, _ => {
        premises
        this.parentNode.removeChild(this);
      });
    });
  };

  window.hidePreloader = _ => {
    const preWrap = document.querySelector('.preloader_wrap');
    if (!preWrap) return;

    fade('out', preWrap, _ => {
      preWrap.parentNode.removeChild(preWrap)
    });
  };
})();

// ----------------------------------------- select text
function selectText(el) {
  var doc = document,
    range,
    selection;

  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(el);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// ----------------------------------------- create table
function createTable() {
  const table = document.getElementById('geocodeTable');
  if (!table) return;

  const $tableWrap = $(table).closest('.js_custom_scroll')
    , apikeyEl = document.querySelector('.js_apikey')
    , tableAfter = document.querySelector('.js_after_table')
    , cordsBttn = document.querySelector('.js_insert_coordinates')
    , copyBttn = document.querySelector('.js_copy_table')
    , progressWrap = document.querySelector('.js_progress_wrap')
    , progress = progressWrap.querySelector('.js_progress')
    , progressVal = progressWrap.querySelector('.js_progress_val')
    , progressTo = progressWrap.querySelector('.js_progress_to')
    , tr = document.createElement('tr')
    , td = document.createElement('td')
    , url = new URLSearchParams(document.head.querySelector('script[src*="api-maps.yandex.ru"]').src.split('?')[1]);

  if (apikeyEl) apikeyEl.textContent = url.get('apikey');

  for (let index = 0; index < 4; index++) {
    const tdC = td.cloneNode();
    if (index == 0) tdC.classList = 'first';
    tr.append(tdC);
  }

  function addContent([adres, material, product, counts], trEl = false) {
    const trC = trEl ? trEl : tr.cloneNode(true);

    for (let tdI = 0; tdI < trC.querySelectorAll('td').length; tdI++) {
      const td = trC.querySelectorAll('td')[tdI];

      switch (tdI) {
        case 0:
          td.textContent = adres
          break;
        case 1:
          td.textContent = material
          break;
        case 2:
          td.textContent = product
          break;
        case 3:
          td.textContent = counts
          break;
      }
    }

    return trC;
  }

  copyBttn.addEventListener('click', e => {
    e.preventDefault();

    selectText(table);
    document.execCommand("copy");
  })

  document.querySelector('.js_json_table').addEventListener('submit', e => {
    e.preventDefault();

    let file = e.target.file
      , reader = new FileReader();

    reader.readAsText(file.files[0]);

    reader.onload = function () {
      window.showPreloader();

      const data = JSON.parse(reader.result);

      setTimeout(() => {
        console.time('затрачено');
        for (let index = 0; index < data.length; index++) {
          const shop = data[index]
            , adres = shop['Адрес'] || shop.adres
            , material = shop['Материал'] || shop.material
            , product = shop['Материал название'] || shop.product
            , counts = shop['Остатки'] || shop.counts
            , trC = addContent([adres, material, product, counts])
            , clone = [...table.querySelectorAll('.first')].filter(el => {
              return el.textContent == adres
            })[0];

          if (clone) {
            const parent = clone.parentNode
              , [mat, pro, cou] = [
                parent.querySelectorAll('td')[1].textContent + ', ' + material,
                parent.querySelectorAll('td')[2].textContent + ', ' + product,
                parent.querySelectorAll('td')[3].textContent + ', ' + counts,
              ]
              , trCs = addContent([adres, mat, pro, cou], parent);

            parent.innerHTML = trCs.innerHTML;
          } else {
            table.append(trC);
          }

          console.info(index, 'из', (data.length - 1));

          if ((data.length - 1) === index) {
            window.hidePreloader();

            console.timeEnd('затрачено');

            setTimeout(() => {
              $(tableAfter).slideDown();
            }, 1000);
          }
        };
      }, 400);
    };
  });

  if (!table && !(typeof ymaps !== 'undefined')) return;

  let count = 0
    , adresesEls = table.querySelectorAll('.first');

  ymaps.ready(function() {
    const myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9
      })
      , addCoord = () => {
        if (count === adresesEls.length) {
          console.log('готово');

          $(cordsBttn.parentNode).slideUp(() => {
            cordsBttn.remove();

            $(copyBttn.parentNode).slideDown();

            window.hidePreloader();

            $('html, body').stop().animate({ scrollTop: tableAfter.offsetTop }, 500, 'swing', () => {
              setTimeout(() => {
                $(progressWrap).slideDown();
              }, 200);
            });
          });
        } else {
          const adresesEl = adresesEls[count];

          ymaps.geocode(adresesEl.textContent, { results: 1 }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0)
              // Координаты геообъекта.
              , coords = firstGeoObject.geometry.getCoordinates()
            // Область видимости геообъекта.
            // , bounds = firstGeoObject.properties.get('boundedBy');

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // Получаем строку с адресом и выводим в иконке геообъекта.
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            // myMap.setBounds(bounds, {
            // 	// Проверяем наличие тайлов на данном масштабе.
            // 	checkZoomRange: true
            // });

            const tdC = td.cloneNode();
            tdC.textContent = coords.join(',');
            // tdC.textContent = count;
            adresesEl.parentNode.append(tdC);

            if (($tableWrap[0].offsetHeight / 2) < adresesEl.offsetTop) {
              $tableWrap.mCustomScrollbar("scrollTo", (adresesEl.offsetTop - ($tableWrap[0].offsetHeight / 2)), {
                scrollInertia: 200
              })
            }

            progress.value = count;
            progressVal.textContent = count;
            console.info(count, 'из', (adresesEls.length - 1));

            ++count;
            // setTimeout(() => {
            addCoord();
            // },222)
          });
        }
      };

    cordsBttn.addEventListener('click', e => {
      e.preventDefault();

      adresesEls = table.querySelectorAll('.first');

      progress.max = adresesEls.length - 1;
      progressTo.textContent = adresesEls.length - 1;

      $('html, body').stop().animate({ scrollTop: tableAfter.offsetTop }, 500, 'swing', () => {
        setTimeout(() => {
          $(progressWrap).slideDown();
        }, 200);
      });

      addCoord();
      window.showPreloader();
    });
  });
}; createTable();