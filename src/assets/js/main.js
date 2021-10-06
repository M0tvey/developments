
const breakpoints = {
  'xlll': 1750,
  'xll': 1400,
  'xl': 1200,
  'lg': 992,
  'md': 768,
  'sm': 576,
  'xs': 320
};

(function () {
  const createElement = (tags, attrs) => {
    let element,
      fragment,
      el_2,
      createEl = (tag, attr) => {
        const cEl = document.createElement(tag);

        for (let at of Object.keys(attr)) {
          cEl.setAttribute(at, attr[at]);
        }
        return cEl;
      };

    tags.forEach((el, index) => {
      if (typeof el != 'object') {
        if (fragment == true) {
          el_2.forEach(eEl => {
            const el_3 = createEl(el, attrs[index]);

            eEl.append(el_3);
            element.append(eEl);
          });

          fragment = false;
        } else {
          el_2 = createEl(el, attrs[index]);

          index == 0 ? element = el_2 : element.append(el_2);
        }
      } else {
        el_2 = [];
        for (let i = 0; i < tags[index].count; i++) { el_2.push(createEl(tags[index].tagName, attrs[index])) };

        fragment = true;
      }
    });

    return element;
  },
    div = createElement(['div', { tagName: 'a', count: 3 }, 'img'], [{ class: 'core-map_item_image_wrap' }, { class: 'core-map_item_link' }, { class: 'core-map_item_image' }]);
}());

const swiper = new Swiper('.swiper-container', {
  speed: 400,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


if ($('#shopMap').length !== 0) {
  var shopMapCenter = $('.js-cluster-map').data('center');
  var shopMapFile = $('.js-cluster-map').data('file');
  ymaps.ready(function () {
    var myMap = new ymaps.Map('shopMap', {
      center: shopMapCenter,
      zoom: 10,
      behaviors: ['default', 'scrollZoom']
    }, {
      searchControlProvider: 'yandex#search'
    }),
      /**
       * Создадим кластеризатор, вызвав функцию-конструктор.
       * Список всех опций доступен в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
       */
      clusterer = new ymaps.Clusterer({
        /**
         * Через кластеризатор можно указать только стили кластеров,
         * стили для меток нужно назначать каждой метке отдельно.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
         */
        preset: 'islands#invertedVioletClusterIcons',
        /**
         * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
         */
        groupByCoordinates: false,
        /**
         * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
         */
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
      }),

      getPointData = function (name, phone, text, time) {
        return {
          balloonContentHeader: '<div class="shops-baloon__title">' + name + '</div>',
          balloonContentBody: '<div class="shops-baloon__phone"><p>' + phone + '</p></div>',
          balloonContentFooter: '<div class="shops-baloon__info">' + text + '</div><div class="shops-baloon__info">' + time + '</div>',
          clusterCaption: ''
        };
      },
      /**
       * Функция возвращает объект, содержащий опции метки.
       * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
       */
      getPointOptions = function () {
        return {
          preset: 'islands#violetIcon'
        };
      },

      geoObjects = [];

    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: false
    });

    myMap.geoObjects.add(clusterer);
    $.getJSON(shopMapFile, showMapObjects);

    function showMapObjects(objects) {
      clusterer.add(
        objects
          .map(function (coords, i) {
            return new ymaps.Placemark(coords.coordinates, getPointData(coords.name, coords.phone, coords.text, coords.time), getPointOptions())
          })
      )
      /**
       * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
       */
      clusterer.add(geoObjects);

      myMap.geoObjects.add(clusterer);
      /**
       * Спозиционируем карту так, чтобы на ней были видны все объекты.
       */

      myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
      });
      myMap.behaviors.disable('scrollZoom');
    }

  });
}
var mapCenter = $('#mapId').data('center');
var fileMap = $('#mapId').data('file');
if ($('#mapId').length !== 0) {


  ymaps.ready().done(function (ym) {
    var myMap = new ym.Map('mapId', {
      center: mapCenter,
      zoom: 10,
      // controls: []
      controls: ['zoomControl']
    });
    //здесь можно создать касмомные элементы управления зума

    // ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
    //     "<div id='zoom-in' class='zoom-btn d-flex align-items-center justify-content-center'><span class='icon-plus'>+</span></div>" +
    //     "<div id='zoom-out' class='zoom-btn d-flex align-items-center justify-content-center'><span class='icon-minus'>–</span></div>" +
    //     "</div>", {
    //
    //     // Переопределяем методы макета, чтобы выполнять дополнительные действия
    //     // при построении и очистке макета.
    //     build: function () {
    //         // Вызываем родительский метод build.
    //         ZoomLayout.superclass.build.call(this);
    //
    //         // Привязываем функции-обработчики к контексту и сохраняем ссылки
    //         // на них, чтобы потом отписаться от событий.
    //         this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
    //         this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
    //
    //         // Начинаем слушать клики на кнопках макета.
    //         $('#zoom-in').bind('click', this.zoomInCallback);
    //         $('#zoom-out').bind('click', this.zoomOutCallback);
    //     },
    //
    //     clear: function () {
    //         // Снимаем обработчики кликов.
    //         $('#zoom-in').unbind('click', this.zoomInCallback);
    //         $('#zoom-out').unbind('click', this.zoomOutCallback);
    //
    //         // Вызываем родительский метод clear.
    //         ZoomLayout.superclass.clear.call(this);
    //     },
    //
    //     zoomIn: function () {
    //         var map = this.getData().control.getMap();
    //         map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
    //     },
    //
    //     zoomOut: function () {
    //         var map = this.getData().control.getMap();
    //         map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
    //     }
    // }),
    //     zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

    // myMap.controls.add(zoomControl);
    jQuery.getJSON(fileMap, function (json) {
      /** Сохраним ссылку на геообъекты на случай, если понадобится какая-либо постобработка.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml
       */
      var geoObjects = ym.geoQuery(json)
        .addToMap(myMap)
        .applyBoundsToMap(myMap, {
          checkZoomRange: true
        });
    });
    myMap.behaviors.disable('scrollZoom');
  });
}
var menuPhone = $('.mob-icon').data('phone');
var trimPhone = menuPhone.replace(/\D+/g, '');

new Mmenu("#menu", {
  extensions: ["pagedim-black"],
  navbar: {
    title: 'Название'
  },
  "navbars": [
    {
      "position": "bottom",
      "content": [
        '<div class="mob-menu__phone">\n' +
        '<i class="fas fa-phone"></i> <a href="tel:+' + trimPhone + '">' + menuPhone + '</a>\n' +
        '</div>'
      ]
    }]
});
//
// $(".mh-head.Sticky").mhead({
//     scroll: {
//         hide: 200
//     }
// });
$("#my-header:not(.Sticky)").mhead({
  scroll: false
});

$(document).ready(function () {
  const myCoreMap = new coreMap({
    customHtmlIcon: {
      isCustom: true
    },
    useInfo: false,
    // changeIconImageOnClick: {
    //   changeIcon: false
    // },
    icons: {
      useSingl: true
    }
  });

  svg4everybody();
  $(document).on('afterLoad.fb', function (event, fancybox, current) {
    $(current.$content).find('select').each(function () {
      var placeholder = $(this).data('placeholder');
      $(this).select2({
        language: 'ru'
      });
    })
    $(current.$content).find('form').parsley();
    $(current.$content).find(".js-phone-mask").inputmask({
      mask: "+7(999)999-99-99"
    });
  })
  $('select').each(function () {
    $(this).select2({
      language: 'ru'
    });
  })

  $('form').parsley();

  var Parsley = window.Parsley;

  Parsley.addMessages('ru', {
    defaultMessage: "Некорректное значение.",
    type: {
      email: "Неверный адрес электронной почты.",
      url: "Введите URL адрес.",
      number: "Введите число.",
      integer: "Введите целое число.",
      digits: "Введите только цифры.",
      alphanum: "Введите буквенно-цифровое значение."
    },
    notblank: "Это поле должно быть заполнено.",
    required: "Обязательное поле.",
    pattern: "Это значение некорректно.",
    min: "Это значение должно быть не менее чем %s.",
    max: "Это значение должно быть не более чем %s.",
    range: "Это значение должно быть от %s до %s.",
    minlength: "Это значение должно содержать не менее %s символов.",
    maxlength: "Это значение должно содержать не более %s символов.",
    length: "Это значение должно содержать от %s до %s символов.",
    mincheck: "Выберите не менее %s значений.",
    maxcheck: "Выберите не более %s значений.",
    check: "Выберите от %s до %s значений.",
    equalto: "Это значение должно совпадать."
  });

  Parsley.setLocale('ru');

  function counter(val) {
    var priceOne = val.parents('.js-counter-container').find('.js-price-one').text().replace(/\s+/g, '');
    var input = val.parents('.js-counter-container').find('.js-counter');
    var counterVal = input.val();
    if (input.hasClass('js-counter-0')) {
      if (!counterVal.length || counterVal <= 0) {
        input.val(1);
        input.select().focus();
        counterVal = 1;
      }
    }
    else {
      if (!counterVal.length || counterVal < 0) {
        input.val(0);
        input.select().focus();
        counterVal = 0;
      }
    }
    if (counterVal.length >= 3) {
      input.val(99);
      input.select().focus();
      counterVal = 99;
    }





  }


  $(".js-phone-mask").inputmask({
    mask: "+7(999)999-99-99"
  });


  $('.js-file-input').on('change', function (e) {
    if ($(this).val() != '') {
      var photoVal = $(this)[0].files[0].name;
      $(this).siblings('.input-file').text(photoVal)
      $(this).parents('.form__body--input').removeClass('has-error').find('.form-error').hide();
    }
    else {
      $(this).siblings('.input-file').text('Нажмите для выбора')
    }
  })
  $(document).on('submit', ".formAjax", function (e) {
    e.preventDefault();
    var $form = $(this);
    if ($form.find("input").hasClass("error")) return;
    var $submitBtn = $form.find('.js-form-ajax-btn');
    var defaultTextBtn = $submitBtn.html();
    var $errorContainer = $form.find('.js-form-ajax-error');
    var fd = new FormData(this);
    $.ajax(
      {
        url: $form.attr("action"),
        type: "POST",
        data: fd,
        dataType: "json",
        processData: false,
        contentType: false,
        beforeSend: function () {
          $errorContainer.html();
          $submitBtn
            .html('Идет отправка...')
            .prop('disabled', true);
        },
        success: function (data) {
          $submitBtn
            .prop('disabled', false)
            .html(defaultTextBtn);

          if (data.status === 1) {
            $.fancybox.open({
              src: data.popup,
              type: 'ajax'
            });
            setTimeout(function () {
              $.fancybox.close();
            }, 3000);

            $form.find('input').val('');
            $form.find('input[type="number"]').val(0);
            $errorContainer.html("")
          } else {
            $errorContainer.html('<div>' + data.error + '</div>');
          }
        },
        error: function (xhr, status, errorString) {
          $errorContainer.html('<div>' + errorString + '</div>');
          $submitBtn
            .prop('disabled', false)
            .html(defaultTextBtn);
        }
      });
  });

  $('.main-gallery').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: '<div class="gallery-arrow-right"></div>',
    prevArrow: '<div class="gallery-arrow-left"></div>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  //collapse-block
  function collapseBlock() {
    const hideClass = 'hidden-txt';

    $('.collapse-block__txt--item').each(function () {
      const $collapseBlock = $(this).closest('.js-collapse-block'),
        sctiveWidth = $collapseBlock.data('active'),
        minHeight = $(this).data('min-height') ? $(this).data('min-height') : 85,
        $textBlock = $collapseBlock.find('.collapse-block__txt'),
        $bttn = $collapseBlock.find('.js-collapse-btn');


      if (sctiveWidth) {
        $bttn.hide();
        $textBlock.removeClass(hideClass);
        if ($(this).height() > minHeight && innerWidth <= breakpoints[sctiveWidth]) {
          $bttn.show();
          $textBlock.addClass(hideClass);
          $textBlock.css('height', minHeight);
        } else {
          $textBlock.css('height', 'auto');
        }
      } else {
console.log($(this).height(), minHeight)
        if ($(this).height() < minHeight) {
          $bttn.hide();
          $textBlock.removeClass(hideClass);
        } else {
          $textBlock.css('height', minHeight);
        }
      }

      $bttn.on('click', function () {
        var showMore = $(this).data('show');
        var hideMore = $(this).data('hide');
        var $blockTxt = $collapseBlock.find('.collapse-block__txt');
        var $blockTxtItem = $blockTxt.find('.collapse-block__txt--item');
        var txtHeight = $blockTxtItem.height();
        const minHeight = $blockTxtItem.data('min-height') ? $blockTxtItem.data('min-height') : 85,
          $textBlock = $(this).find('span').length ? $(this).find('span') : $(this);

        if ($blockTxt.hasClass('hidden-txt')) {
          $textBlock.text(hideMore);
          $blockTxt.height(txtHeight);
          $blockTxt.removeClass('hidden-txt');
        } else {
          $textBlock.text(showMore);
          $blockTxt.addClass('hidden-txt').height(minHeight)
        }
      });
    });
  }
  collapseBlock();
  $(window).resize(function () {
    collapseBlock()
  });

  // -------------------------------- verticla adaptive accardion --------------------------------
  (_ => {
    const verAccords = $('.js_ver_accord');

    verAccords.each(function () {
      const verAccord = $(this),
        verAccordLinkClass = 'js_ver_accord_link'
      verAccordLinks = verAccord.find(`.${verAccordLinkClass}`),
        verAccordBlockClass = 'js_ver_accord_block',
        verAccordItemClass = 'js_ver_accord_item',
        linkInit = _ => {
          verAccordLinks.each(function () {
            const $link = $(this),
              verAccordBlock = $link.siblings(`.${verAccordBlockClass}`)

            if (!$link.parent(`.${verAccordItemClass}`).is(`.${openClass}`)) verAccordBlock.hide();

            $link.on('click', function (e) {
              e.preventDefault();

              verAccord.find(`.${verAccordItemClass}.${openClass}`).each(function () {
                $(this).removeClass(openClass);
                $(this).find(`.${verAccordBlockClass}`).slideUp();
              });

              if (verAccordBlock.is(':hidden')) {
                verAccordBlock.closest(`.${verAccordItemClass}`).addClass(openClass);
                verAccordBlock.slideDown();
              }
            });
          });
        };

      if (verAccord[0].className.indexOf('js_accard-')) {
        const pointName = verAccord.attr('class').split('js_accard-').pop();
        let isActive = innerWidth < breakpoints[pointName];

        if (isActive) linkInit();

        $(window).on('resize', function () {
          isActive = innerWidth < breakpoints[pointName];

          if (isActive) {
            if (!testEvent(verAccordLinks[0], 'click')) linkInit();
          } else {
            verAccord.find(`.${verAccordItemClass}`).each(function () {
              const $item = $(this);
              $item.show().removeClass(openClass);
              $item.find(`.${verAccordLinkClass}`).off('click');
              $item.find(`.${verAccordBlockClass}`).slideDown();
            });
          }
        });
      } else {
        linkInit();
      }
    });
  })();
});