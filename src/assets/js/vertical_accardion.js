// -------------------------------- verticla adaptive accardion --------------------------------
(_=>{
  const verAccords = $('.js_ver_accord'),
    openClass = 'ver_accord_open',
    breakpoints = {
      'xlll': 1750,
      'xll': 1400,
      'xl': 1200,
      'lg': 992,
      'md': 768,
      'sm': 576,
      'xs': 320
    };

  verAccords.each(function () {
    const verAccord = $(this),
      verAccordLinkClass = 'js_ver_accord_link'
      verAccordLinks = verAccord.find(`.${ verAccordLinkClass }`),
      verAccordBlockClass = 'js_ver_accord_block',
      verAccordItemClass = 'js_ver_accord_item',
      linkInit = _=> {
        verAccordLinks.each(function () {
          const $link = $(this),
            verAccordBlock = $link.siblings(`.${ verAccordBlockClass }`)

          if (!$link.parent(`.${ verAccordItemClass }`).is(`.${ openClass }`)) verAccordBlock.hide();

          $link.on('click', function (e) {
            e.preventDefault();

            verAccord.find(`.${ verAccordItemClass }.${ openClass }`).each(function(){
              $(this).removeClass(openClass);
              $(this).find(`.${ verAccordBlockClass }`).slideUp();
            });

            if (verAccordBlock.is(':hidden')) {
              verAccordBlock.closest(`.${ verAccordItemClass }`).addClass(openClass);
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
          verAccord.find(`.${ verAccordItemClass }`).each(function(){
            const $item = $(this);
            $item.show().removeClass(openClass);
            $item.find(`.${ verAccordLinkClass }`).off('click');
            $item.find(`.${verAccordBlockClass}`).slideDown();
          });
        }
      });
    } else {
      linkInit();
    }
  });
})();