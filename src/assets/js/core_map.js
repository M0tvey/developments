"use strict";
class coreMap {
  constructor(settings = {}) {
    this.mapSet = {
      wrapClassElement: settings.wrapClassElement || 'js_core-map_wrap',                                                                                                   // Класс елемента где будет распологаться карта.
      icons: {
        useSingl: settings.icons?.useSingl == null ? false : settings.icons.useSingl,                                                                                      // Использовать одну иконку или несколько?
        singlIcon: settings.icons?.singlIcon || {
          coordinates: [55.744522, 37.616378],                                                                                                                              // Координаты одно единой иконки.
          name: 'Название'
        },
        cordsIconHref: settings.icons?.cordsIconHref || '/core_map.json',                                                                                                  // Json файл с метками.
      },
      useInfo: settings.useInfo == null ? true : settings.useInfo,                                                                                                        // Показываьть информацию о метке?
      activeIconClass: settings.activeIconClass || 'core-map_label_anim',                                                                                                  // Класс активной метки.
      iconImageHref: settings.iconImageHref || '/assets/img/map_icon.png',                                                                                                 // Своё изображение иконки метки.
      changeIconImageOnClick: {
        changeIcon: settings.changeIconImageOnClick?.changeIcon == null ? true : settings.changeIconImageOnClick?.changeIcon,                                                                                                   // Менять ли картинку маркера при клике.
        imageHref: settings.changeIconImageOnClick?.imageHref || '/assets/img/map_icon_active.png'                                                                         // Картинка маркера при клике.
      },
      customHtmlIcon: {
        isCustom: settings.customHtmlIcon?.isCustom == null ? false : settings.customHtmlIcon.isCustom,                                                                                                              // Использовать кастомный HTML иконки?
        iconHtml: settings.customHtmlIcon?.iconHtml ||
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 56" width="42" height="56">' +
          '<defs>' +
          '<filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="20.1538" width="52" y="39.8462" x="0" id="filter0_f">' +
          '<feGaussianBlur stdDeviation="2.5"/>' +
          '</filter>' +
          '</defs>' +
          '<path class="path_1" stroke="null" fill="#525252" d="m21.000001,54.999999c12.797251,-2.8169 19.195876,-4.9284 19.195876,-6.3346c0,-2.1093 -8.594268,-3.8192 -19.195876,-3.8192c-10.601608,0 -19.195876,1.7099 -19.195876,3.8192c0,1.4062 6.398625,3.5177 19.195876,6.3346z" clip-rule="evenodd" fill-rule="evenodd" filter="url(#filter0_f)" opacity="0.35"/>' +
          '<g class="path_2">' +
          '<path id="icon" d="m21,55c14,-15.2583 21,-26.6959 21,-34.3127c0,-11.42529 -9.402,-20.6873 -21,-20.6873c-11.59798,0 -21,9.26201 -21,20.6873c0,7.6168 7,19.0544 21,34.3127z" clip-rule="evenodd" fill-rule="evenodd"/>' +
          '</g>' +
          '<use class="path_3" xlink:href="#icon"/>' +
          '</svg>',                                                                                                                                                        // Кастомный HTML иконки.
        coordinates: settings.customHtmlIcon?.coordinates || [[[0, 0], [-15, -19], [-20, -33], [-14, -47], [0, -54], [14, -47], [20, -33], [15, -19], [0, 0]]],            // Полигон описывается в виде трехмерного массива. Массив верхнего уровня содержит контуры полигона. Первый элемента массива - это внешний контур, а остальные - внутренние.
      },
      showBalloon: settings.showBalloon == null ? false : settings.showBalloon,                                                                                            // Показывать информацию в балуне или в оьдельном блоке.
      appearanceEffect: settings.appearanceEffect || 'fade',                                                                                                               // Эффект появления информации в блоке.
      blockSide: settings.blockSide || 'left',                                                                                                                             // С какой стороны будет показыватся блок с информацией.
      mapScroll: settings.mapScroll == null ? false : settings.mapScroll,                                                                                                  // Будет ли скролится карта?
      centerMap: settings.centerMap || [55.751574, 37.573856],                                                                                                             // Координаты центра карты.
      zoomMap: settings.zoomMap || 10,                                                                                                                                     // Координаты центра карты.
      closeBalloonAfterMapClick: settings.closeBalloonAfterMapClick == null ? true : settings.closeBalloonAfterMapClick,                                                   // Закрывать балун при клике по карте или по кнопке?
      shiftMapToCenterOfLabel: settings.shiftMapToCenterOfLabel == null ? true : settings.shiftMapToCenterOfLabel,                                                         // Скролить карту при клике по метке?
      mapControls: settings.mapControls || [],                                                                                                                             // Кнопки карты

      useClusterer: settings.useClusterer == null ? true : settings.useClusterer,                                                                                          // Групировать В кластеры?
      clusterIconBlockClass: settings.clusterIconBlockClass || 'core-map_cluster_text',                                                                                    // Класс блока с цифрой в кластере.
      clusterImageHref: settings.clusterImageHref || '/assets/img/18plus.png',                                                                                             // Своё изображение иконки кластера.
      changeClusterImageOnClick: {
        changeIcon: settings.changeIconImageOnClick?.changeIcon == null ? true : settings.changeIconImageOnClick.changeIcon,                                               // Менять ли картинку маркера при клике.
        imageHref: settings.changeIconImageOnClick?.imageHref || '/assets/img/18plus_active.png'                                                                           // Картинка маркера при клике.
      },
      clusterZoom: settings.clusterZoom == null ? false : settings.clusterZoom,                                                                                            // Зумирывать карту при клике на кластер.
      customHtmlCluster: {
        isCustom: settings.customHtmlCluster?.isCustom == null ? false : settings.customHtmlCluster?.isCustom,                                                             // Использовать кастомный HTML кластерв?
        clusterHtml: settings.customHtmlCluster?.clusterHtml ||
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 56" width="42" height="56">' +
          '<defs>' +
          '<filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="20.1538" width="52" y="39.8462" x="0" id="filter0_f">' +
          '<feGaussianBlur stdDeviation="2.5"/>' +
          '</filter>' +
          '</defs>' +
          '<path class="path_1" stroke="null" fill="#525252" d="m21.000001,54.999999c12.797251,-2.8169 19.195876,-4.9284 19.195876,-6.3346c0,-2.1093 -8.594268,-3.8192 -19.195876,-3.8192c-10.601608,0 -19.195876,1.7099 -19.195876,3.8192c0,1.4062 6.398625,3.5177 19.195876,6.3346z" clip-rule="evenodd" fill-rule="evenodd" filter="url(#filter0_f)" opacity="0.35"/>' +
          '<g class="path_2">' +
          '<path id="icon" d="m21,55c14,-15.2583 21,-26.6959 21,-34.3127c0,-11.42529 -9.402,-20.6873 -21,-20.6873c-11.59798,0 -21,9.26201 -21,20.6873c0,7.6168 7,19.0544 21,34.3127z" clip-rule="evenodd" fill-rule="evenodd"/>' +
          '</g>' +
          '<use class="path_3" xlink:href="#icon"/>' +
          '</svg>',                                                                                                                                                        // Кастомный HTML кластера.
        coordinates: settings.customHtmlCluster?.coordinates || [[[0, 0], [-15, -19], [-20, -33], [-14, -47], [0, -54], [14, -47], [20, -33], [15, -19], [0, 0]]],         // Полигон описывается в виде трехмерного массива. Массив верхнего уровня содержит контуры полигона. Первый элемента массива - это внешний контур, а остальные - внутренние.
      },
      dataLinkOpenClaster: settings.dataLinkOpenClaster == null ? false : settings.dataLinkOpenClaster, // Показывать ссылку раскрывающую кластер
      // dataBlockTemplate: settings.changeIconImageOnClick?.imageHref || '<div class="">',
      events: {
        beforeDataShow: coreMapData => { settings.events.beforeDataShow ? settings.events.beforeDataShow(coreMapData) : null },
        mapReady: _=> { settings.events.mapReady ? settings.events?.mapReady() : null }
      },
    };

    const wrapEl = document.querySelector(`.${this.mapSet.wrapClassElement}`);
    if (wrapEl == null) return;

    if (this.mapSet.icons.useSingl) {
      this.mapSet.centerMap = this.mapSet.icons.singlIcon.coordinates;
      this.mapSet.useClusterer = false;
    }

    const mapWrap = this.mapSet.showBalloon ? wrapEl : document.createElement('div'),
      mapBlockInfo = document.createElement('div'),
      fadeBlockClass = '.core-map_item_wrap';

    let coreMapObj = {};

    wrapEl.classList.add('core-map_wrap');
    mapBlockInfo.classList.add('core-map_data');
    mapWrap.classList.add('core-map_map');
    mapWrap.id = 'core-map_map';

    if (!this.mapSet.showBalloon) {
      wrapEl.classList.add(`data_${this.mapSet.blockSide == 'left' ? 'left' : 'right'}`, `effect_${this.mapSet.appearanceEffect}`);
      wrapEl.appendChild(mapWrap);
      if (this.mapSet.useInfo) this.mapSet.blockSide == 'left' ? wrapEl.prepend(mapBlockInfo) : wrapEl.append(mapBlockInfo);
    }

    this.getDimensions = (_src, callback) => {
      const img = document.createElement('img');

      img.src = _src;
      img.onload = () => {
        callback({
          height: img.height,
          width: img.width
        });
      };
    };

    this.fade = (effect, el, time, callback) => {
      if (el == null) return;
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

    this.effect = html => {
      const mapBlockItem = mapBlockInfo.querySelector(fadeBlockClass),
        time = 3,
        isFade = this.mapSet.appearanceEffect == 'fade',
        openClass = 'open_block';

      if (mapBlockItem == null) {
        mapBlockInfo.append(html);

        if (isFade) this.fade('in', mapBlockInfo.querySelector(fadeBlockClass));
      } else {

        if (isFade) {
          wrapEl.classList.add('fade');

          this.fade('out', mapBlockInfo.querySelector(fadeBlockClass), time, () => {
            mapBlockInfo.append(html);
            this.mapSet.events.beforeDataShow(mapBlockInfo.lastElementChild);

            this.fade('in', mapBlockInfo.querySelector(fadeBlockClass), time);
          });
        } else {
          const timerId = setInterval(() => coreMapObj.container.fitToViewport(), 5);

          if (html.querySelector('.item_clear') == null) {
            if (wrapEl.classList.contains(openClass)) {
              mapBlockInfo.append(html);
              this.mapSet.events.beforeDataShow(mapBlockInfo.lastElementChild);

              const newBlocks = mapBlockInfo.querySelectorAll('.core-map_item_wrap');

              newBlocks.item(newBlocks.length - 1).classList.add('new');
            } else {
              mapBlockInfo.innerHTML = '';
              mapBlockInfo.append(html);
              this.mapSet.events.beforeDataShow(mapBlockInfo.lastElementChild);
              wrapEl.classList.add(openClass);
            }
          } else {
            wrapEl.classList.remove(openClass);
          }

          setTimeout(() => { clearInterval(timerId) }, 500);
        }
      }
    };

    this.createTemplateElement = (tags, attrs, event) => {
      let element,
        insetr,
        el_2,
        createEl = (tag, attr, index, e) => {
          const cEl = document.createElement(tag);

          for (let at of Object.keys(attr)) {
            if (at != 'content') {
              if (Array.isArray(attr[at])) {
                cEl.setAttribute(at, attr[at][index]);
              } else {
                cEl.setAttribute(at, attr[at]);
              }
            }
          };

          if (attr.content) cEl.innerText = attr.content;
          if (e) {
            for (let ev of Object.keys(e[index])) {
              cEl.addEventListener(ev, e[index][ev], true);
            }
          }

          return cEl;
        };

      tags.forEach((el, index) => {
        if (typeof el != 'object') {
          if (insetr) {
            el_2.forEach((eEl, i) => {
              const el_3 = createEl(el, attrs[index], i, event);

              eEl.append(el_3);
              element.append(eEl);
            });

            insetr = false;
          } else {
            el_2 = createEl(el, attrs[index], index, event);

            index == 0 ? element = el_2 : element.append(el_2);
          }
        } else {
          el_2 = [];
          if (index == 0 && el.count) element = new DocumentFragment();

          for (let i = 0; i < el.count; i++) {
            const tagAttrs = { ...attrs[index] };

            if (attrs[index].content && Array.isArray(attrs[index].content)) tagAttrs.content = tagAttrs.content[i];

            if (el.insertEvery) {
              el_2.push(createEl(tags[index].tagName, tagAttrs, i, event));
              insetr = el.insertEvery;
            } else {
              element.append(createEl(tags[index].tagName, tagAttrs, i, event));
            }
          };
        }
      });

      return element;
    };

    this.mapCreateDataTemplate = item => {
      const templateItem = (insides, icon) => {
        const isItemClear = insides != 'clear',
          itemBlockObj = { class: 'core-map_item' };

        if (icon) {
          itemBlockObj['data-claster'] = insides.id;
        } else {
          itemBlockObj['data-item'] = insides.officces?.join();
        }

        const itemBlock = this.createTemplateElement(['div'], [itemBlockObj]),

          itemTitle = isItemClear && insides.name ? insides.link ? this.createTemplateElement(['a'], [{ class: 'core-map_item_title', href: insides.link, content: insides.name }]) : this.createTemplateElement(['span'], [{ class: 'core-map_item_title', content: insides.name }]) : '',
          itemTitle2 = isItemClear && insides.name ? this.createTemplateElement(['span'], [{ class: 'card_title', content: insides.name }]) : '',

          itemAdres = isItemClear && insides.adres ? this.createTemplateElement(['p'], [{ class: 'card_adress', content: insides.adres }]) : '',
          itemAdres2 = isItemClear && insides.adres ? this.createTemplateElement(['span'], [{ class: 'card_adress', content: insides.adres }]) : '',

          itemImage = isItemClear && insides.images ? this.createTemplateElement(['img'], [{ class: 'card_image card_image_slider', src: insides.images[0].src, alt: insides.images[0].alt }]) : '',
          itemImages = isItemClear && insides.images ? this.createTemplateElement(['div', { tagName: 'a', count: insides.images.length, insertEvery: true }, 'img'], [
            { class: 'core-map_item_image_wrap' },
            { class: 'core-map_item_link', href: insides.images.map(i => i.src), 'data-fancybox': insides.name, 'data-caption': insides.images.map(i => i.alt) },
            { class: 'core-map_item_image', src: insides.images.map(i => i.src), alt: insides.images.map(i => i.alt) }]) : '',

          itemLink = this.mapSet.dataLinkOpenClaster && isItemClear && icon && insides.coordinates ? this.createTemplateElement(['a'], [{ class: 'core-map_item_cords_link', href: '#', content: 'К метке' }],
            [{
              click: e => {
                e.preventDefault();

                this.balloonOpen(icon, 12);
                setTimeout(_ => { this.toggleIconAndClass(icon) }, 550);
              }
            }]) : '',

          itemPhones = isItemClear && insides.phones ? this.createTemplateElement(['div', { tagName: 'a', count: insides.phones.length }], [
            { class: 'core-map_item_phone_wrap', content: 'Телефон: ' }, { class: 'core-map_item_phone', href: insides.phones.map(i => `tel:${i.replace(/[- )(]/g, '')}`), content: insides.phones.map(i => i) }]) : '',

          itemMetro = isItemClear && insides.metro ? this.createTemplateElement(['div', { tagName: 'span', count: insides.metro.length }], [
            { class: 'metro_titles comma_separated' }, { content: insides.metro.map(i => i.name) }]) : '',
          itemMetroBullet = isItemClear && insides.metro ? this.createTemplateElement(['div', { tagName: 'span', count: insides.metro.length }], [
            { class: 'metro_bullets' }, { class: insides.metro.map(i => i.id) }]) : '',
          itemMetro2 = isItemClear && insides.metro ? this.createTemplateElement(['span', { tagName: 'span', count: insides.metro.length }], [
            { class: 'card_metro_title comma_separated' }, { content: insides.metro.map(i => i.name) }]) : '',
          itemMetroBullet2 = isItemClear && insides.metro ? this.createTemplateElement(['span', { tagName: 'span', count: insides.metro.length }], [
            { class: 'card_metro_list' }, { class: insides.metro.map(i => i.id) }]) : '',

          itemRemoteness = isItemClear && insides.remoteness ? this.createTemplateElement(['span'], [{ class: 'core-map_item_remoteness', content: insides.remoteness }]) : '',

          itemText = isItemClear && insides.text ? this.createTemplateElement(['span'], [{ class: 'core-map_item_text', content: insides.text }]) : '',

          itemTime = isItemClear && insides.time ? this.createTemplateElement(['span'], [{ class: 'core-map_item_time', content: insides.time }]) : '',

          itemPrice = isItemClear && insides.price_square ? this.createTemplateElement(['span'], [{ class: 'card_price small', content: insides.price_square + ' м², офис' }]) : '',
          itemPrice2 = isItemClear && insides.price_seat ? this.createTemplateElement(['span'], [{ class: 'card_price small', content: insides.price_seat + ' ₽ / мес.' }]) : '';

        if (isItemClear) {
          // itemBlock.append(itemTitle, itemImages, itemLink, itemPhones, itemText, itemTime)
          const itemHtml = icon ?
            `<a href="/bc_gregory-s_palace.html" class="card">
              <span class="card_image_wrap">${itemImage.outerHTML}</span>
              <span class="card_content">
                ${itemTitle2.outerHTML}
                ${itemAdres2.outerHTML}
                ${itemPrice.outerHTML}
                ${itemPrice2.outerHTML}
                <span class="card_metro">
                  ${itemMetro2.outerHTML}
                  <span class="card_metro_list">
                    ${itemMetroBullet2.innerHTML}
                    <span class="card_metro_name">метро</span>
                  </span>
                </span>
              </span>
            </a>`
            :
            `${itemTitle.outerHTML}
            ${itemAdres.outerHTML}
            <div class="core-map_item_data">
              <div class="metro">
                <p class="item_title">Метро</p>
                ${itemMetro.outerHTML}
                <div class="metro_bullets_wrap">
                  ${itemMetroBullet.outerHTML}
                  <span class="bullets_title">линии</span>
                </div>
              </div>
              <div class="core-map_item_remoteness">
                <p class="item_title">Удаленность</p>
                ${itemRemoteness.outerHTML}
              </div>
            </div>`;

          itemBlock.insertAdjacentHTML('afterbegin', itemHtml);
        } else {
          itemBlock.classList.add('item_clear');
          itemBlock.append(this.createTemplateElement([{ tagName: 'div', count: 6 }], [{ class: 'core-map_item_clear' }]))
        }

        return itemBlock;
      },
        itemWrap = this.createTemplateElement(['div'], [{ class: 'core-map_item_wrap', style: this.mapSet.showBalloon || this.mapSet.appearanceEffect == 'slide' ? '' : 'opacity:0;' }]);

      let template;

      if (Array.isArray(item)) {
        const fragment = document.createDocumentFragment(),
          countText = item.length + ' ' + (item.length > 1 && item.length <= 4 ? 'предложения' : 'предложений'),
          count = this.createTemplateElement(['p'], [{ class: 'core-map_offices-count', content: countText }]),
          wrap = this.createTemplateElement(['div'], [{ class: 'buildings_list' }]);

        wrap.append(count);

        item.forEach(el => {
          fragment.append(templateItem(el.properties.get('balloonData'), el));
        });

        wrap.append(fragment);

        template = wrap;
      } else if (typeof item == 'string' && item != 'clear') {
        const fragment = document.createElement('div');

        fragment.innerHTML = item;

        template = fragment;
      } else {
        template = templateItem(item);
      }

      itemWrap.append(template);

      return itemWrap;
    };

    this.removeClassAndIconToAll = _ => {
      const acativeLabel = mapWrap.querySelector(`.${this.mapSet.activeIconClass}`)

      if (acativeLabel != null) {
        coreMapObj.geoObjects.each(geoObject => {

          if (this.mapSet.useClusterer && !this.mapSet.customHtmlCluster.isCustom) {
            geoObject.getClusters().forEach(cluster => {
              const clusterImage = cluster.options.get('clusterIcons')[0];
              cluster.options.set('clusterIcons', [{ 'href': this.mapSet.clusterImageHref, 'size': clusterImage.size, 'offset': clusterImage.offset }])
            });

            if (!this.mapSet.customHtmlIcon.isCustom) geoObject.getGeoObjects().forEach(object => { object.options.set('iconImageHref', this.mapSet.iconImageHref,) });
          } else {
            if (!this.mapSet.customHtmlIcon.isCustom) geoObject.options.set(optionName, iconImage);
          }

        });
        acativeLabel.classList.remove(this.mapSet.activeIconClass);
      }
    }

    this.toggleIconAndClass = item => {
      const isCluster = item.options._name == 'cluster',
        clusterImageSizes = isCluster && !this.mapSet.customHtmlCluster.isCustom ? item.options.get('clusterIcons')[0] : [],
        iconImage = isCluster ? [{ 'href': this.mapSet.clusterImageHref, 'size': clusterImageSizes.size, 'offset': clusterImageSizes.offset }] : this.mapSet.iconImageHref,
        iconImageActive = isCluster ? [{ 'href': this.mapSet.changeClusterImageOnClick.imageHref, 'size': clusterImageSizes.size, 'offset': clusterImageSizes.offset }] : this.mapSet.changeIconImageOnClick.imageHref,
        optionName = isCluster ? 'clusterIcons' : 'iconImageHref',
        label = item.getOverlaySync().getLayoutSync().getParentElement();

      if (!label.classList.contains(this.mapSet.activeIconClass)) {
        this.removeClassAndIconToAll();

        if (isCluster) {
          if (this.mapSet.changeClusterImageOnClick.changeIcon || !this.mapSet.customHtmlCluster.isCustom) item.options.set(optionName, iconImageActive);
        } else {
          if (this.mapSet.changeIconImageOnClick.changeIcon && !this.mapSet.customHtmlIcon.isCustom) item.options.set(optionName, iconImageActive);
        }

        label.classList.add(this.mapSet.activeIconClass);

        if (!this.mapSet.showBalloon) {
          const itemsFor = isCluster ? item.getGeoObjects() : item.properties.get('balloonData');

          if (this.mapSet.shiftMapToCenterOfLabel) this.balloonOpen(item);

          if (this.mapSet.useInfo) { this.effect(this.mapCreateDataTemplate(itemsFor)) };
        }
      } else {
        if (isCluster) {
          if (this.mapSet.changeClusterImageOnClick.changeIcon || !this.mapSet.customHtmlCluster.isCustom) item.options.set(optionName, iconImage);
        } else {
          if (this.mapSet.changeIconImageOnClick.changeIcon && !this.mapSet.customHtmlIcon.isCustom) item.options.set(optionName, iconImage);
        }
        label.classList.remove(this.mapSet.activeIconClass);

        if (this.mapSet.useInfo) if (!this.mapSet.showBalloon) this.effect(this.mapCreateDataTemplate('clear'));

        if (this.mapSet.appearanceEffect == 'fade') wrapEl.classList.remove('fade');
      }
    };

    this.balloonOpen = (target, zoom = coreMapObj.getZoom()) => {
      const pixelCenter = [],
        pointCords = coreMapObj.options.get('projection').toGlobalPixels(target.geometry._coordinates, coreMapObj.getZoom());

      pixelCenter[0] = pointCords[0]; // left
      pixelCenter[1] = pointCords[1]; // top

      if (this.mapSet.showBalloon) {
        const ballon = coreMapObj.container._mapElement.querySelector('.core-map_balloon-content');
        const balloonSize = [ballon.clientWidth, ballon.clientHeight];

        pixelCenter[0] += (balloonSize[0] / 2);
        pixelCenter[1] += ((balloonSize[1] / 2) - 50);
      }

      const geoCenter = this.mapSet.showBalloon ? coreMapObj.options.get('projection').fromGlobalPixels(pixelCenter, coreMapObj.getZoom()) : target.geometry._coordinates;

      coreMapObj.setCenter(geoCenter, zoom, {
        checkZoomRange: true,
        duration: 500,
        timingFunction: 'ease-in-out',
        useMapMargin: true
      });
    };

    this.balloonClose = (target, zoom = coreMapObj.getZoom()) => {
      if (!this.mapSet.shiftMapToCenterOfLabel && !target) return;

      const isCluster = target.options.getName() == 'cluster',
        clusterImageSizes = isCluster ? target.options.get('clusterIcons')[0] : [],
        optionName = isCluster ? 'clusterIcons' : 'iconImageHref',
        optionValue = isCluster ? [{ 'href': this.mapSet.clusterImageHref, 'size': clusterImageSizes.size, 'offset': clusterImageSizes.offset }] : this.mapSet.iconImageHref;

      if (!this.mapSet.customHtmlIcon.isCustom && !this.mapSet.customHtmlCluster.isCustom) target.options.set(optionName, optionValue);

      wrapEl.classList.remove('fade');

      if (target.getOverlaySync()) target.getOverlaySync().getLayoutSync().getParentElement().classList.remove(this.mapSet.activeIconClass);

      coreMapObj.setCenter(target.geometry._coordinates, zoom, {
        checkZoomRange: true,
        duration: 700,
        timingFunction: 'ease-in-out'
      });
    };

    this.iconProperties = (type, callback) => {
      let iconoOtions = {};

      if (type == 'icon') {
        if (this.mapSet.customHtmlIcon.isCustom) {
          const iconTemplate = ymaps.templateLayoutFactory.createClass(`<div class="core-map_custom_placemark_layout">${this.mapSet.customHtmlIcon.iconHtml}</div>`);

          iconoOtions.iconLayout = iconTemplate;
          iconoOtions.iconShape = {
            type: 'Polygon',
            coordinates: this.mapSet.customHtmlIcon.coordinates
          }

          callback(iconoOtions);

        } else {

          const imageHref = this.mapSet.iconImageHref;

          this.getDimensions(imageHref, size => {
            const imgHeight = size.height, imgWidth = size.width;

            iconoOtions.iconLayout = imageHref == null ? 'default#imageWithContent' : 'default#image';
            iconoOtions.iconImageHref = imageHref;
            iconoOtions.iconImageSize = [imgWidth, imgHeight];
            iconoOtions.iconImageOffset = [-imgWidth / 2, -imgHeight]; // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            iconoOtions.hideIconOnBalloonOpen = false;

            callback(iconoOtions);
          });
        }

      } else if (type == 'cluster') {

        if (this.mapSet.customHtmlCluster.isCustom) {
          const iconTemplate = ymaps.templateLayoutFactory.createClass(`<div class="core-map_custom_placemark_layout">${this.mapSet.customHtmlCluster.clusterHtml}<div class="${this.mapSet.clusterIconBlockClass}">{{ properties.geoObjects.length }}</div></div>`);

          iconoOtions.clusterIconLayout = iconTemplate;
          iconoOtions.clusterIconShape = {
            type: 'Polygon',
            coordinates: this.mapSet.customHtmlCluster.coordinates
          }

          callback(iconoOtions);

        } else {

          const imageHref = this.mapSet.clusterImageHref;

          this.getDimensions(imageHref, size => {
            const imgHeight = size.height, imgWidth = size.width;

            iconoOtions.href = imageHref;
            iconoOtions.size = [imgWidth, imgHeight];
            iconoOtions.offset = [-imgWidth / 2, -imgHeight]; // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).

            callback(iconoOtions);
          })
        }
      }
    };

    this.createPlacemarks = objects => {
      let placemarks = [];

      this.iconProperties('icon', options => {
        objects.forEach((item, i) => {
          const geoObjectProperties = {
            balloonData: item,
            hintContent: item.name
          };

          if (this.mapSet.showBalloon) {
            options.balloonLayout = ymaps.templateLayoutFactory.createClass(
              '<div class="core-map_balloon popover top">' +
              '$[[options.contentLayout observeSize]]' +
              '</div>', {
              build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = this.getParentElement().querySelector('.popover');

                this._$element.querySelector('.close').addEventListener('click', this.onCloseClick);
              },
              clear: function () {
                this._$element.querySelector('.close').removeEventListener('click', this.onCloseClick);

                this.constructor.superclass.clear.call(this);
              },
              onCloseClick: function (e) {
                e.preventDefault();

                coreMapObj.balloon.close();
              }
            });

            options.balloonContentLayout = ymaps.templateLayoutFactory.createClass(
              '<div class="core-map_balloon-content">' +
              '<a class="core-map_balloon_close close" href="#">&times;</a>' +
              `${this.mapCreateDataTemplate(item).outerHTML}` +
              '</div>'
            );

            options.hideIconOnBalloonOpen = false;
            options.balloonOffset = [0, 5];
          }

          placemarks[i] = new ymaps.Placemark(item.coordinates, geoObjectProperties, options);

          placemarks[i].events.add('click', e => {
            this.toggleIconAndClass(e.get('target'));
          });

          if (this.mapSet.shiftMapToCenterOfLabel) {
            placemarks[i].events.add('balloonopen', e => {
              this.balloonOpen(e.get('target'));
            }).add('balloonclose', e => {
              this.balloonClose(e.get('target'));
            });
          }

          if (!this.mapSet.useClusterer) coreMapObj.geoObjects.add(placemarks[i]);
        });
      });

      this.placemarks = placemarks;
      return placemarks;
    };

    this.createClasterer = placemarks => {
      this.iconProperties('cluster', clusterImageProp => {
        let clustererProperties = {
          clusterNumbers: [10],
          clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(`<div class="${this.mapSet.clusterIconBlockClass}">{{ properties.geoObjects.length }}</div>`)
        };

        if (this.mapSet.clusterImageHref == null) {
          clustererProperties.preset = 'islands#invertedVioletClusterIcons';
        } else {
          if (this.mapSet.customHtmlCluster.isCustom) {
            clustererProperties = Object.assign(clusterImageProp, clustererProperties);
          } else {
            clustererProperties.clusterIcons = [clusterImageProp];
          }
        }

        if (!this.mapSet.clusterZoom) {
          clustererProperties.clusterDisableClickZoom = true;
          clustererProperties.clusterOpenBalloonOnClick = this.mapSet.showBalloon ? true : false;

          if (this.mapSet.showBalloon) {
            clustererProperties.hideIconOnBalloonOpen = false;
            clustererProperties.clusterBalloonPanelMaxMapArea = 0;
            clustererProperties.clusterBalloonMaxHeight = 200;
            clustererProperties.clusterBalloonLayout = ymaps.templateLayoutFactory.createClass(
              '<div class="core-map_balloon popover top">' +
              '<div class="core-map_balloon-content">' +
              '<a class="core-map_balloon_close close" href="#">&times;</a>' +

              '<div class="core-map_item_wrap">' +
              '{% for geoObject in properties.geoObjects %}' +
              '<div class="core-map_item">' +
              '{% if geoObject.properties.balloonData.name %}<p class="core-map_item_title">{{ geoObject.properties.balloonData.name }}</p>{% endif %}' +

              '{% if geoObject.properties.balloonData.images.length %}' +
              '<div class="core-map_item_image_wrap">' +
              '{% for image in geoObject.properties.balloonData.images %}' +
              '<a class="core-map_item_link" href="{{ image.src }}" data-fancybox="{{ geoObject.properties.balloonData.name }}" data-caption="{{ image.alt }}">' +
              '<img src="{{ image.src }}" alt="{{ image.alt }}" class="core-map_item_image">' +
              '</a>' +
              '{% endfor %}' +
              '</div>' +
              '{% endif %}' +

              '{% if geoObject.properties.balloonData.phones.length %}' +
              '<div class="core-map_item_phone_wrap">Телефон:' +
              '{% for phone in geoObject.properties.balloonData.phones %}' +
              '<a href="tel:{{ phone }}" class="core-map_item_phone">{{ phone }}</a>' +
              '{% endfor %}' +
              '</div>' +
              '{% endif %}' +

              '{% if geoObject.properties.balloonData.text %}<p class="core-map_item_text">{{ geoObject.properties.balloonData.text }}</p>{% endif %}' +

              '{% if geoObject.properties.balloonData.time %}<p class="core-map_item_time">{{ geoObject.properties.balloonData.time }}</p>{% endif %}' +
              '</div>' +
              '{% endfor %}' +
              '</div>' +
              '</div>' +
              '</div>', {
              build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = this.getParentElement().querySelector('.popover');

                this._$element.querySelector('.close').addEventListener('click', this.onCloseClick);
              },
              clear: function () {
                this._$element.querySelector('.close').removeEventListener('click', this.onCloseClick);

                this.constructor.superclass.clear.call(this);
              },
              onCloseClick: function (e) {
                e.preventDefault();

                coreMapObj.balloon.close();
              }
            });
          }
        }

        const clusterer = new ymaps.Clusterer(clustererProperties);

        if (!this.mapSet.clusterZoom) {
          clusterer.events.add('click', e => {
            if (e.get('target').options._name == 'cluster') {
              this.toggleIconAndClass(e.get('target'));
            }
          });
        }

        if (this.mapSet.shiftMapToCenterOfLabel) {
          clusterer.balloon.events.add('open', e => {
            this.balloonOpen(e.get('cluster'));
          }).add('close', e => {
            this.balloonClose(e.get('cluster'));
          });
        }

        clusterer.add(placemarks);
        coreMapObj.geoObjects.add(clusterer);
      });
    };

    this.showMapObjects = (objects) => {
      const placemarks = this.createPlacemarks(objects);

      if (this.mapSet.useClusterer) this.createClasterer(placemarks);
    };

    this._getTileContainer = layer => {
      for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
          if (
            layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
            || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
          ) {
            return layer[k];
          }
        }
      }
      return null;
    };

    this.mapInit = function (map) {
      ymaps.ready(function () {
        const mapControls = map.mapSet.appearanceEffect == 'slide' && map.mapSet.mapControls.indexOf('typeSelector') != -1
          ? map.mapSet.mapControls.splice(map.mapSet.mapControls.indexOf('typeSelector'), 1)
          : map.mapSet.mapControls,
          myMap = new ymaps.Map(mapWrap.id, {
            center: map.mapSet.centerMap,
            zoom: map.mapSet.zoomMap,
            behaviors: ['default', 'scrollZoom'],
            controls: map.mapSet.mapControls
          }, {
            searchControlProvider: 'yandex#search'
          }),
          closeAll = _ => {
            if (myMap.balloon.getData) {
              let itemBalloonClosed;

              if (!map.mapSet.showBalloon) {
                if (map.mapSet.useInfo) map.effect(map.mapCreateDataTemplate('clear'));
                map.removeClassAndIconToAll();
                wrapEl.classList.remove('fade');
              } else {
                itemBalloonClosed = myMap.balloon.getData().geoObject ? myMap.balloon.getData().geoObject : myMap.balloon.getData();

                myMap.balloon.close();
                map.balloonClose(itemBalloonClosed);
              }
            }
          },
          addGradient = _ => {
            const setAttributes = (el, attrs) => {
              for (var key in attrs) {
                el.setAttribute(key, attrs[key]);
              }
            },
              gradientSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
              gradientDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
              gradientLinearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'),
              gradientStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');

            setAttributes(gradientSvg, {
              'height': 0,
              'width': 0
            });

            setAttributes(gradientLinearGradient, {
              'gradientUnits': 'objectBoundingBox',
              'y2': 1,
              'x2': 0,
              'y1': 0,
              'x1': 0,
              'id': 'linear'
            });

            setAttributes(gradientStop, {
              'stop-color': '#2E414F',
              'offset': 0,
              "class": "gr_color_first"
            });

            const gradientStop_2 = gradientStop.cloneNode();

            setAttributes(gradientStop_2, {
              'stop-color': '#2E414F',
              'offset': 1,
              "class": "gr_color_second"
            });

            const gradientStop_3 = gradientStop.cloneNode(),
              gradientStop_4 = gradientStop_2.cloneNode();

            gradientStop_3.setAttribute('stop-color', '#F25123');
            gradientStop_4.setAttribute('stop-color', '#C33B21');

            gradientLinearGradient.append(gradientStop);
            gradientLinearGradient.append(gradientStop_2);

            const gradientLinearGradientSecond = gradientLinearGradient.cloneNode();

            gradientLinearGradientSecond.setAttribute('id', 'linear_active');
            gradientLinearGradientSecond.append(gradientStop_3);
            gradientLinearGradientSecond.append(gradientStop_4);

            gradientDefs.append(gradientLinearGradient);
            gradientDefs.append(gradientLinearGradientSecond);
            gradientSvg.append(gradientDefs);
            document.body.append(gradientSvg);
          },
          layer = myMap.layers.get(0).get(0),
          tc = map._getTileContainer(layer);

        tc.events.once("ready", function() { map.mapSet.events.mapReady() });

        if (map.mapSet.customHtmlIcon.isCustom || map.mapSet.customHtmlCluster.isCustom) addGradient();

        if (map.mapSet.appearanceEffect == 'slide' && mapControls.indexOf('typeSelector') != -1) {
          myMap.controls.add('typeSelector', {
            float: 'none',
            position: { top: '10px', right: '40px' }
          });
        }

        if (map.mapSet.useInfo && !map.mapSet.showBalloon) map.effect(map.mapCreateDataTemplate('clear'));

        if (!map.mapSet.mapScroll) myMap.behaviors.disable('scrollZoom');

        if (map.mapSet.icons.useSingl) {
          setTimeout(_ => { map.showMapObjects([map.mapSet.icons.singlIcon]) }, 100);
        } else {
          $.getJSON(map.mapSet.icons.cordsIconHref, data => {
            map.showMapObjects(data);
          });
        }

        if (map.mapSet.closeBalloonAfterMapClick) {
          myMap.events.add('click', _ => {
            closeAll();
          });
        } else {
          const closeLink = map.createTemplateElement(['a'], [{ class: 'core-map_map_close', href: '#', content: '✕' }], [{
            click: e => {
              e.preventDefault();

              closeAll();
            }
          }]);

          mapWrap.append(closeLink);
        }

        coreMapObj = myMap;
      });
    };

    this.mapInit(this);
  };

  showCustomContent(html) {
    this.effect(this.mapCreateDataTemplate(html));
  }

  balloonZoom(iconId) {
    const icon = this.placemarks.filter(mark => mark.properties._data.balloonData.id === +iconId)[0]

    this.balloonOpen(icon, 12);
    setTimeout(_ => { this.toggleIconAndClass(icon) }, 600);
  }
};