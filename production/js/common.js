$(document).ready(function () {

    var DATA = new Firebase('https://sludb.firebaseio.com/');

    function init() {
        getUniversities();
    }

    init();

    // Chrome Smooth Scroll
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
        $.smoothScroll();
    }

    // resize function
    $(window).resize(function () {
        $("#log").append("<div>Handler for .resize() called.</div>");
    });

    // Scroll function
    $(window).bind('scroll', function (e) {
        var scrolled = $(window).scrollTop();
        navBg(scrolled);
        parallaxScroll(scrolled);
    });

    // Parallax
    function parallaxScroll(scrolled) {
        $('.parallax-bg').each(function (index) {
            var elem = $(this),
                parallaxSpeed = elem.attr("data-parrallax");
            elem.css("background-position", 'center ' + (0 - (scrolled * parallaxSpeed)) + 'px');
        });
        $('.parallax-top').each(function (index) {
            var elem = $(this),
                parallaxSpeed = elem.attr("data-parrallax");
            elem.css("top", (70 - (scrolled * parallaxSpeed)) + 'px');
        });
    }

    $.fn.animated = function (inEffect, outEffect, offset) {
        $(this).css("opacity", "0").addClass("animated").waypoint(function (dir) {
            if (dir === "down") {
                $(this).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
            } else {
                $(this).removeClass(inEffect).addClass(outEffect).css("opacity", "1");
            };
        }, {
            offset: offset
        }).waypoint(function (dir) {
            if (dir === "down") {
                $(this).removeClass(inEffect).addClass(outEffect).css("opacity", "1");
            } else {
                $(this).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
            };
        }, {
            offset: -$(window).height()
        });
    };

    // hide/show nav bg
    function navBg(scroll) {
        if (scroll > 1) {
            $(".nav-wrap.container-fluid").addClass('scrolled');
            $(".nav-bg").addClass('active');
        } else {
            $(".nav-wrap.container-fluid").removeClass('scrolled');
            $(".nav-bg").removeClass('active');
        }
    }

    // scroll to block
    $(".scroll-to").mPageScroll2id(
        /*{
                offset: function () {
                    if ($(window).width() > 768) {
                        return 70;
                    } else {
                        return 0;
                    }
                }
            }*/
    );

    // data
    function getUniversities() {
        DATA.child("universities").on("value", function (snapshot) {
            var universities = snapshot.val(),
                $items = '';
            $.each(universities, function (key, value) {
                $items += '<div class="item hint col-md-2" data-hint="' + value.title + '"><img src="img/universities/' + value.name + '"alt=""></div>';
            });
            $($items).appendTo('.universities-list');
        });
    }


    // map
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'your.mapbox.project.id',
        accessToken: 'pk.eyJ1IjoiZGltYTE5OTEiLCJhIjoiY2loeDkzbDNwMDMybnVza29ndzBvaW1kayJ9.y8BFdJYW48wBdZeMAnwkmw'
    }).addTo(map);
});

$(window).load(function () {
    var delay = 1000;

    $(".preloader").delay(delay).fadeOut("slow");
    setTimeout(function () {
        $(".header .logo").animated("fadeInDown", "bounceOut", "80%");
    }, delay);
});