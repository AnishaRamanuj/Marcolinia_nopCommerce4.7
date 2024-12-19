(function ($, ssCore, ssEx) {

    window.themeSettings = {
        themeBreakpoint: 1024,
        isAccordionMenu: false
    };

    // same height container 
    function equalHeight(group) {
        var tallest = 0;

        group.each(function () {
            var thisHeight = $(this).height();
            if (thisHeight > tallest) {
                tallest = thisHeight;
            }
        });

        group.height(tallest);
    }

    // vertical parallax
    function showVerticalParallax(breakPoint) {
        var news = $('.news-list-homepage').offset().top;
        var newsHeight = $('.news-list-homepage').outerHeight();

        $(window).on('scroll', function () {
            if (ssCore.getViewPort().width >= breakPoint) {
                var winTop = $(this).scrollTop();

                if (winTop > news - newsHeight - 300) {
                    var animatedBg = $(".news-list-homepage");
                    var offsetMinusWinHeight = animatedBg.offset().top - winTop;
                    var start = 0;
                    var index = -0.9;
                    animatedBg.css({
                        'background-position': '50%' + (start + offsetMinusWinHeight) * index + 'px'
                    });

                    if (winTop > newsHeight) {
                        var target = $(".news-list-homepage .news-items");
                        var index1 = (target.offset().top) - ($(window).scrollTop() + 250);
                        var currentPos = 0;

                        target.css({
                            'position': 'relative',
                            'top': currentPos + index1 / 1.8 + 'px'
                        });
                    }
                    //both can be in one if condition (winTop > news - newsHeight)
                    if (winTop > news - newsHeight) {
                        var newsCarousel = $('.news-carousel');
                        var startAnimation = (newsCarousel.offset().top) - (winTop + 800);
                        //newsCarousel.css('margin-top', newsCarousel / 2 + 'px');
                        newsCarousel.css({
                            'position': 'relative',
                            'top': startAnimation / 2.4 + 'px'
                        });
                    }
                }
            }
        });
    }
    // custom select elements
    function customSelect() {
        $('.feat select').each(function () {
            $(this).wrap('<div class="custom-select" />');
            $('<div class="custom-select-text" />').prependTo($(this).parent('.custom-select'));
            $(this).siblings('.custom-select-text').text($(this).children('option:selected').text());
        }).change(function () {
            $(this).siblings('.custom-select-text').text($(this).children('option:selected').text());
        });
    }

    // top sliders
    function positionSliderWrapper(breakPoint) {
        var sliderWrapper = $('.home-page-main-slider, .categories-banner');

        if (sliderWrapper.length === 0) {
            return;
        }

        var menuHeight = $('.header-menu-wrapper').innerHeight() || 0;

        if (ssCore.getViewPort().width < breakPoint) {
            menuHeight = $('.responsive-nav-wrapper-parent').innerHeight() || 0;
        }

        sliderWrapper.css('margin-top', -menuHeight);
    }

    $(document).ready(function () {
        var responsiveAppSettings = {
            isEnabled: true,
            themeBreakpoint: window.themeSettings.themeBreakpoint,
            isSearchBoxDetachable: true,
            isHeaderLinksWrapperDetachable: true,
            doesDesktopHeaderMenuStick: true,
            doesScrollAfterFiltration: true,
            doesSublistHasIndent: true,
            displayGoToTop: true,
            hasStickyNav: true,
            selectors: {
                menuTitle: ".menu-title",
                headerMenu: ".header-menu",
                headerMenuDesktopStickElement: "#headerMenuParent",
                headerMenuDesktopStickParentElement: ".header-menu-wrapper",
                closeMenu: ".close-menu",
                //movedElements: ".admin-header-links, .header, .responsive-nav-wrapper, .slider-wrapper, .master-wrapper-content, .footer",
                sublist: ".header-menu .sublist",
                overlayOffCanvas: ".overlayOffCanvas",
                withSubcategories: ".with-subcategories",
                filtersContainer: ".nopAjaxFilters7Spikes",
                filtersOpener: ".filters-button span",
                searchBoxOpener: ".search-wrap > span",
                searchBox: ".search-box.store-search-box",
                searchBoxBefore: ".header-selectors-wrapper",
                navWrapper: ".responsive-nav-wrapper",
                navWrapperParent: ".responsive-nav-wrapper-parent",
                headerLinksOpener: "#header-links-opener",
                headerLinksWrapper: ".header-links-wrapper",
                headerLinksWrapperDesktopPrependTo: '.header-inner',
                shoppingCartLink: ".shopping-cart-link"
            }
        };

        ssEx.initResponsiveTheme(responsiveAppSettings);

        // CUSTOM SELECTS
        $(".product-selectors select").simpleSelect();

        // equal height element 
        $(window).on('resize, load', function () {

            if (ssCore.getViewPort().width > 768) {
                var target = $(".news-list-homepage .news-item");
                var targetBlog = $(".rich-blog-homepage .blog-post");
                var targetBlogLength = $(".rich-blog-homepage .blog-post").length;

                if (target.length == 2) {
                    equalHeight(target);
                } else {
                    $(target).css('width', '100%');
                }

                if (targetBlogLength == 3) {
                    $('.blog-post').addClass('threeInRow');
                }
                if (targetBlogLength > 1) {
                    equalHeight(targetBlog);
                }

                equalHeight($('.shipping-method .method-list li'));
            }
        });

        // check attr
        if ($('.nopAjaxFilters7Spikes').attr('data-filtersuimode') == 'usedropdowns') {
            $('.nopAjaxFilters7Spikes .filter-block').addClass('no-border');
        }

        // call select customisation function
        if (ssCore.getViewPort().width >= window.themeSettings.themeBreakpoint) {
            customSelect();
        }

        // parallax
        if ($('.home-page-wrapper .news-list-homepage').length > 0) {
            showVerticalParallax(responsiveAppSettings.themeBreakpoint);
        }

        var previousWidth = ssCore.getViewPort().width;

        var onWidthBreak = function (isInitialLoad) {
            var viewport = ssCore.getViewPort().width;

            if (isInitialLoad || (viewport > responsiveAppSettings.themeBreakpoint && previousWidth <= responsiveAppSettings.themeBreakpoint) ||
                (viewport <= responsiveAppSettings.themeBreakpoint && previousWidth > responsiveAppSettings.themeBreakpoint)) {
                positionSliderWrapper(responsiveAppSettings.themeBreakpoint);
            }

            previousWidth = viewport;
        };

        onWidthBreak(true);
        ssEx.addWindowEvent("resize", function () { onWidthBreak(false); });
        ssEx.addWindowEvent("orientationchange", function () { onWidthBreak(false); });
    });
})(jQuery, sevenSpikesCore, sevenSpikesEx);