					(function($) {
            "use strict";
            
            //Hide Loading Box (Preloader)
            function handlePreloader() {
                if ($('.loader-wrap').length) {
                    $('.loader-wrap').delay(300).fadeOut(300);
                }
            }

            if ($('.preloader-close').length) {
                $('.preloader-close').on('click', function () {
                    $('.loader-wrap').delay(300).fadeOut(300);
                });
            }
            
            //Update Header Style and Scroll to Top
            function headerStyle() {
                if($('.main-header').length){
                    var windowpos = $(window).scrollTop();
                    var siteHeader = $('.main-header');
                    var scrollLink = $('.scroll-to-top');
                    
                    var HeaderHight = $('.main-header').height();
                    if (windowpos >= HeaderHight) {
                        siteHeader.addClass('fixed-header');
                        scrollLink.fadeIn(300);
                    } else {
                        siteHeader.removeClass('fixed-header');
                        scrollLink.fadeOut(300);
                    }
                }
            }
            
            headerStyle();
            
            //Submenu Dropdown Toggle
            if($('.main-header li.dropdown ul').length){
                $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
                
                //Dropdown Button + parent link toggle (mobile-friendly)
                $('.main-header li.dropdown .dropdown-btn').on('click', function() {
                    $(this).prev('ul').slideToggle(500);
                });
                $('.mobile-menu .navigation li.dropdown > a').on('click', function(e) {
                    e.preventDefault();
                    $(this).next('ul').slideToggle(300);
                });
                
                //Disable dropdown parent link
                $('.navigation li.dropdown > a').on('click', function(e) {
                    e.preventDefault();
                });
                
                //Disable dropdown parent link
                $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
                    e.preventDefault();
                });

                $('.xs-sidebar-group .close-button').on('click', function(e) {
                    $('.xs-sidebar-group.info-group').removeClass('isActive');
                });

                $('.about-widget').on('click', function(e) {
                    $('.about-sidebar').addClass('active');
                });

                $('.about-sidebar .close-button').on('click', function(e) {
                    $('.about-sidebar').removeClass('active');
                });
                
                $('.about-sidebar .gradient-layer').on('click', function(e) {
                    $('.about-sidebar').removeClass('active');
                });
            }
            
            //Mobile Nav Hide Show
            if($('.mobile-menu').length){
                var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
                $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
                $('.sticky-header .main-menu').append(mobileMenuContent);
                
                //Hide / Show Submenu
                $('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
                    e.preventDefault();
                    var target = $(this).parent('li').children('ul');
                    
                    if ($(target).is(':visible')){
                        $(this).parent('li').removeClass('open');
                        $(target).slideUp(500);
                        $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                        $(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
                        return false;
                    } else {
                        $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                        $(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
                        $(this).parent('li').toggleClass('open');
                        $(this).parent('li').children('ul').slideToggle(500);
                    }
                });

                //3rd Level Nav
                $('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function(e) {
                    e.preventDefault();
                    var targetInner = $(this).parent('li').children('ul');
                    
                    if ($(targetInner).is(':visible')){
                        $(this).parent('li').removeClass('open');
                        $(targetInner).slideUp(500);
                        $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                        $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                        return false;
                    } else {
                        $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                        $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                        $(this).parent('li').toggleClass('open');
                        $(this).parent('li').children('ul').slideToggle(500);
                    }
                });

                //Menu Toggle Btn
                $('.mobile-nav-toggler').on('click', function() {
                    $('body').addClass('mobile-menu-visible');
                });

                //Menu Toggle Btn
                $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
                    $('body').removeClass('mobile-menu-visible');
                    $('.mobile-menu .navigation > li').removeClass('open');
                    $('.mobile-menu .navigation li ul').slideUp(0);
                });

                $(document).keydown(function(e){
                    if(e.keyCode == 27) {
                        $('body').removeClass('mobile-menu-visible');
                        $('.mobile-menu .navigation > li').removeClass('open');
                        $('.mobile-menu .navigation li ul').slideUp(0);
                    }
                });
            }

            const serviceImgItem = document.querySelectorAll(".news-block_two-inner");
            function followImageCursor(event, serviceImgItem) {
                const contentBox = serviceImgItem.getBoundingClientRect();
                const dx = event.clientX - contentBox.x;
                const dy = event.clientY - contentBox.y;
                serviceImgItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
            }
            serviceImgItem.forEach((item, i) => {
                item.addEventListener("mousemove", (event) => {
                    setInterval(followImageCursor(event, item), 1000);
                });
            });

            // Add Current Class Auto
            function dynamicCurrentMenuClass(selector) {
                let FileName = window.location.href.split("/").reverse()[0];

                selector.find("li").each(function () {
                    let anchor = $(this).find("a");
                    if ($(anchor).attr("href") == FileName) {
                        $(this).addClass("current");
                    }
                });
                // if any li has .current elmnt add class
                selector.children("li").each(function () {
                    if ($(this).find(".current").length) {
                        $(this).addClass("current");
                    }
                });
                // if no file name return
                if ("" == FileName) {
                    selector.find("li").eq(0).addClass("current");
                }
            }

            if ($('.main-header .main-menu .navigation').length) {
                dynamicCurrentMenuClass($('.main-header .main-menu .navigation'));
            }

            window.onload = function() {
                var splineElement = document.querySelectorAll('spline-viewer');
                
                for (let pas = 0; pas < splineElement.length; pas++) {
                    var shadowRoot = splineElement[pas].shadowRoot;
                    shadowRoot.querySelector('#logo').remove();
                }
            }

            //Fact Counter + Text Count
            if($('.count-box').length){
                $('.count-box').appear(function(){
                    var $t = $(this),
                        n = $t.find(".count-text").attr("data-stop"),
                        r = parseInt($t.find(".count-text").attr("data-speed"), 10);
                        
                    if (!$t.hasClass("counted")) {
                        $t.addClass("counted");
                        $({
                            countNum: $t.find(".count-text").text()
                        }).animate({
                            countNum: n
                        }, {
                            duration: r,
                            easing: "linear",
                            step: function() {
                                $t.find(".count-text").text(Math.floor(this.countNum));
                            },
                            complete: function() {
                                $t.find(".count-text").text(this.countNum);
                            }
                        });
                    }
                }, {accY: 0});
            }

            // Scroll to a Specific Div
            if($('.scroll-to-target').length){
                $(".scroll-to-target").on('click', function() {
                    var target = $(this).attr('data-target');
                    // animate
                    $('html, body').animate({
                        scrollTop: $(target).offset().top
                    }, 100);
                });
            }

            if($('.paroller').length){
                $('.paroller').paroller({
                    factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control  
                    factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
                    type: 'foreground',     // background, foreground  
                    direction: 'horizontal' // vertical, horizontal  
                });
            }

            //Price Range Slider
            if($('.price-range-slider').length){
                $( ".price-range-slider" ).slider({
                    range: true,
                    min: 0,
                    max: 10000,
                    values: [ 1000, 8000 ],
                    slide: function( event, ui ) {
                        $( "input.price-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                    }
                });
                
                $( "input.price-amount" ).val( $( ".price-range-slider" ).slider( "values", 0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );    
            }

            // Three Items Slider
            var slider = new Swiper('.three-item_carousel', {
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    enabled: true,
                    delay: 6000
                },
                navigation: {
                    nextEl: '.three-item_carousel-next',
                    prevEl: '.three-item_carousel-prev',
                    clickable: true,
                },
                pagination: {
                    el: ".three-item_carousel-pagination",
                    clickable: true,
                },
                speed: 500,
                breakpoints: {
                    '1600': {
                        slidesPerView: 3,
                    },
                    '1200': {
                        slidesPerView: 3,
                    },
                    '992': {
                        slidesPerView: 3,
                    },
                    '768': {
                        slidesPerView: 2,
                    },
                    '600': {
                        slidesPerView: 1,
                    },
                    '576': {
                        slidesPerView: 1,
                    },
                    '0': {
                        slidesPerView: 1,
                    },
                },
            });

            // Odometer
            $(document).ready(function() {
                if (!$('.odometer').length) return;

                $('.odometer').each(function() {
                    var odo = $(this);
                    var final = odo.attr('data-count');
                    if (!odo.text() || odo.text() === '' || odo.text() === '00') {
                        odo.text('0');
                    }
                    odo.data('odometerFinal', final);
                });

                function activateOdometer(el) {
                    var $el = $(el);
                    if ($el.data('odometerDone')) return;
                    $el.data('odometerDone', true);
                    setTimeout(function () {
                        $el.text($el.data('odometerFinal'));
                    }, 150);
                }

                if ('IntersectionObserver' in window) {
                    var observer = new IntersectionObserver(function(entries, obs) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                activateOdometer(entry.target);
                                obs.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.35 });

                    $('.odometer').each(function() {
                        observer.observe(this);
                    });
                } else {
                    // Fallback: run once after load if browser doesn't support IntersectionObserver
                    setTimeout(function() {
                        $('.odometer').each(function() {
                            activateOdometer(this);
                        });
                    }, 300);
                }
            });


            // Title Animation
            let splitTitleLines = gsap.utils.toArray(".title-anim");

            splitTitleLines.forEach(splitTextLine => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });

                const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: "lines" })
                tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
            });

            // LightBox Image
            if($('.lightbox-image').length) {
                $('.lightbox-image').magnificPopup({
                    type: 'image',
                    gallery:{
                        enabled:true
                    }
                });
            }

            // LightBox Video
            if($('.lightbox-video').length) {
                $('.lightbox-video').magnificPopup({
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    iframe:{
                        patterns:{
                            youtube:{
                                index: 'youtube.com',
                                id: 'v=',
                                src: 'https://www.youtube.com/embed/%id%'
                            },
                        },
                        srcAction:'iframe_src',
                    },
                    fixedContentPos: false
                });
            }

            //Contact Form Validation
            if($('#contact-form').length){
                $('#contact-form').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        phone: {
                            required: true
                        },
                        query: {
                            required: true
                        },
                        message: {
                            required: true
                        }
                    }
                });
            }

            // Elements Animation
            if($('.wow').length){
                var wow = new WOW({
                    boxClass:     'wow',      // animated element css class (default is wow)
                    animateClass: 'animated', // animation css class (default is animated)
                    offset:       0,          // distance to the element when triggering the animation (default is 0)
                    mobile:       true,       // trigger animations on mobile devices (default is true)
                    live:         true       // act on asynchronously loaded content (default is true)
                });
                wow.init();
            }

            // When document is scrolling, do
            $(window).on('scroll', function() {
                headerStyle();
            });

            // When document is loading, do
            $(window).on('load', function() {
                handlePreloader();
            });

        })(window.jQuery);



(function() {
  var header = document.querySelector('.main-header');
  if (!header) return;

  function fadeHeaderBg() {
    var scrollY = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var fadeEnd = vh * 0.15; // 15% of viewport
    var opacity = 1;

    var isMobile = window.innerWidth <= 991;
    var isContact = document.body && document.body.classList.contains('contact-page');
    var minOpacity = 0.7;

    if (isMobile) {
      minOpacity = isContact ? 0 : 0.7;

      if (scrollY >= fadeEnd) {
        opacity = minOpacity;
      } else if (scrollY > 0) {
        opacity = 1 - ((scrollY / fadeEnd) * (1 - minOpacity));
      }
    } else {
      // Desktop: start fully transparent and fade in.
      if (scrollY >= fadeEnd) {
        opacity = 0.7;
      } else if (scrollY > 0) {
        opacity = (scrollY / fadeEnd) * 0.7;
      } else {
        opacity = 0;
      }
    }

    header.style.background = "rgba(0,0,0," + opacity + ")";
    header.style.transition = "background 0.25s";
  }

  window.addEventListener('scroll', fadeHeaderBg);
  window.addEventListener('resize', fadeHeaderBg);
  fadeHeaderBg(); // Run at load
})();

// Mission/Vision background drift on scroll
(function() {
  var mv = document.querySelector('.mv-simple');
  if (!mv) return;

  function updateMvBg() {
    var y = window.scrollY || window.pageYOffset || 0;
    var offset = -(y * 0.15); // move image left as you scroll down
    mv.style.setProperty('--mv-bg-offset', offset + 'px');
  }

  window.addEventListener('scroll', updateMvBg, { passive: true });
  window.addEventListener('resize', updateMvBg);
  updateMvBg();
})();
