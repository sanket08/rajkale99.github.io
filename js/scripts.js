

var appMaster = {

    preLoader: function(){
        imageSources = []
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if($(imageSources).load()){
            $('.pre-loader').fadeOut('slow');
        }
    },

    smoothScroll: function() {
        // Smooth Scrolling
        $('a[href*=#]:not([href=#carousel-example-generic])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    reviewsCarousel: function() {
        // Reviews Carousel
        $('.review-filtering').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000
        });
    },

    screensCarousel: function() {
        // Screens Carousel
        $('.filtering').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('.js-filter-all').on('click', function() {
            $('.filtering').slickUnfilter();
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-one').on('click', function() {
            $('.filtering').slickFilter('.one');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-two').on('click', function() {
            $('.filtering').slickFilter('.two');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-three').on('click', function() {
            $('.filtering').slickFilter('.three');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

    },

    animateScript: function() {
        $('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'100%'});
        $('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'100%'});
        $('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'100%'});
        $('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'100%'});
        $('.scrollpoint.sp-effect5').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInUp');},{offset:'100%'});
    },

    revSlider: function() {

        var docHeight = $(window).height();


        var mainSlider = $('.tp-banner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: docHeight,
            hideThumbs: 10,
            touchenabled: false,
            fullWidth: "on",
            hideTimerBar: "on",
            fullScreen: "on",
            onHoverStop: "off",
            fullScreenOffsetContainer: ""
        });

    },

    scrollMenu: function(){
        var num = 50; //number of pixels before modifying styles
        if ($(window).scrollTop() > num) {
            $('nav').addClass('scrolled');
        }
        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > num) {
                $('nav').addClass('scrolled');

            } else {
                $('nav').removeClass('scrolled');
            }
        });

        $('ul.navbar-nav li a').bind('click', function(){
            if($(this).closest('.navbar-collapse').hasClass('in')){
                $(this).closest('.navbar-collapse').removeClass('in');
            }
        });

    },
    placeHold: function(){
        // run Placeholdem on all elements with placeholders
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

}; // AppMaster


$(document).ready(function() {

    appMaster.smoothScroll();

    appMaster.reviewsCarousel();

    appMaster.screensCarousel();

    appMaster.animateScript();

    appMaster.revSlider();

    appMaster.scrollMenu();

    appMaster.placeHold();



});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        trigger : 'hover',
        placement : 'left'
    });
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}

//SEND BUTTON PRESS AND FORM VALIDATION
var order_type ;
$("#sendButton").click(function(){
//  $("#myModal").modal({"backdrop": "static"});
    var userName = $("#userName").val();
    var email = $("#email").val();
    var appLink = $("#appLink").val();
    var message = $("#message").val();
    var url = '{% url submit_form %}'



var f;
//    console.log("Send button Order type "+order_type);
    $.ajax({
        url:"/submit_form/",
        type: "POST",
        data: {
          'name': userName,
          'email': email,
          'app_url': appLink,
          'order_type': order_type,
          'message' : message
        },
        dataType: 'json',
        beforeSend : function () {
//            $("#render-paypal-button").hide();
        },

        success: function (data) {
//           console.log('SUCCESS AJAX ');
          //  console.log(data);
            $("#gif-loader").hide();

            country = data.country
            //console.log("Country in Js "+country)
            if( country != "IN")
               $("#instamojo").hide();
            else
                $("#instamojo").show();   
            if( country != "IN"){
               $("#instamojo").hide();
            }


             f = document.createElement("form");
            f.setAttribute('method',data.method);
            f.setAttribute('action',data.action);

            var input_amount = document.createElement("input"); //input element, text
            input_amount.setAttribute('id',data.input_amount.id);
            input_amount.setAttribute('name',data.input_amount.name);
            input_amount.setAttribute('type',data.input_amount.type);
            input_amount.setAttribute('value',data.input_amount.value);


            var input_notify = document.createElement("input"); //input element, text
            input_notify.setAttribute('id',data.input_notify.id);
            input_notify.setAttribute('name',data.input_notify.name);
            input_notify.setAttribute('type',data.input_notify.type);
            input_notify.setAttribute('value',data.input_notify.value);


            var input_return = document.createElement("input"); //input element, text
            input_return.setAttribute('id',data.input_return.id);
            input_return.setAttribute('name',data.input_return.name);
            input_return.setAttribute('type',data.input_return.type);
            input_return.setAttribute('value',data.input_return.value);


            var input_charset = document.createElement("input"); //input element, text
            input_charset.setAttribute('id',data.input_charset.id);
            input_charset.setAttribute('name',data.input_charset.name);
            input_charset.setAttribute('type',data.input_charset.type);
            input_charset.setAttribute('value',data.input_charset.value);



            var input_business = document.createElement("input"); //input element, text
            input_business.setAttribute('id',data.input_business.id);
            input_business.setAttribute('name',data.input_business.name);
            input_business.setAttribute('type',data.input_business.type);
            input_business.setAttribute('value',data.input_business.value);



            var input_cmd = document.createElement("input"); //input element, text
            input_cmd.setAttribute('id',data.input_cmd.id);
            input_cmd.setAttribute('name',data.input_cmd.name);
            input_cmd.setAttribute('type',data.input_cmd.type);
            input_cmd.setAttribute('value',data.input_cmd.value);



            var input_currency = document.createElement("input"); //input element, text
            input_currency.setAttribute('id',data.input_currency.id);
            input_currency.setAttribute('name',data.input_currency.name);
            input_currency.setAttribute('type',data.input_currency.type);
            input_currency.setAttribute('value',data.input_currency.value);



            var input_invoice = document.createElement("input"); //input element, text
            input_invoice.setAttribute('id',data.input_invoice.id);
            input_invoice.setAttribute('name',data.input_invoice.name);
            input_invoice.setAttribute('type',data.input_invoice.type);
            input_invoice.setAttribute('value',data.input_invoice.value);



            var input_custom = document.createElement("input"); //input element, text
            input_custom.setAttribute('id',data.input_custom.id);
            input_custom.setAttribute('name',data.input_custom.name);
            input_custom.setAttribute('type',data.input_custom.type);
            input_custom.setAttribute('value',data.input_custom.value);


             var input_cancel = document.createElement("input"); //input element, text
            input_cancel.setAttribute('id',data.input_cancel.id);
            input_cancel.setAttribute('name',data.input_cancel.name);
            input_cancel.setAttribute('type',data.input_cancel.type);
            input_cancel.setAttribute('value',data.input_cancel.value);


            var input_image = document.createElement("input"); //input element, text
            input_image.setAttribute('src',data.input_image.src);
            input_image.setAttribute('border',data.input_image.border);
            input_image.setAttribute('type',data.input_image.type);
            input_image.setAttribute('name',data.input_image.name);
            input_image.setAttribute('alt',data.input_image.alt);


            var input_item = document.createElement("input"); //input element, text
            input_item.setAttribute('id',data.input_item.id);
            input_item.setAttribute('name',data.input_item.name);
            input_item.setAttribute('type',data.input_item.type);
            input_item.setAttribute('value',data.input_item.value);


            var input_shipping = document.createElement("input"); //input element, text
            input_shipping.setAttribute('id',data.input_shipping.id);
            input_shipping.setAttribute('name',data.input_shipping.name);
            input_shipping.setAttribute('type',data.input_shipping.type);
            input_shipping.setAttribute('value',data.input_shipping.value);



            f.appendChild(input_amount);
            f.appendChild(input_notify);
            f.appendChild(input_return);
            f.appendChild(input_charset);
            f.appendChild(input_business);
            f.appendChild(input_cmd);
            f.appendChild(input_currency);
            f.appendChild(input_invoice);
            f.appendChild(input_custom);
            f.appendChild(input_cancel);
            f.appendChild(input_image);
            f.appendChild(input_item);
            f.appendChild(input_shipping);

            var long_url = data.long_url
            //console.log('Long url instamojo '+long_url);
//            $("#instamojo").attr("href",long_url)
            document.getElementById("instamojo").href=long_url;

            var div = document.getElementById("render-paypal-button");
            div.innerHTML = "";
            div.appendChild(f);

         }
     });


//    console.log(email + "yooo");
    if ( userName === "" || email === "" || appLink === "")
        {
             $(".change1").html( "<b>This field is required</b>" );
            $(".change1").css( "color", "red" );
             $(".change2").html( "<b>Invalid Email-ID</b>" );
            $(".change2").css( "color", "red" );
            $(".change3").html( "<b>This field is required</b>" );
            $(".change3").css( "color", "red" );
        }
    else{

        $('#myModal').modal('hide');
      $(".msend").attr("data-target","#modalSubscription");
    }



    var username = document.getElementById("userName");
    var putname = document.getElementById("putName");
    putname.innerHTML = username.value;

    //for Email
    var email = document.getElementById("email");
    var putemail = document.getElementById("putEmail");
    putemail.innerHTML = email.value;

    //for app link
    var applink = document.getElementById("appLink");
    var putapplink = document.getElementById("putApplink");
    putapplink.innerHTML = applink.value;
    //for message
    var message = document.getElementById("message");
    var messagelink = document.getElementById("messagelink");
    messagelink.innerHTML = message.value;
});


//function getDetails() {
//
//    var username = document.getElementById("userName");
//    var putname = document.getElementById("putName");
//    putname.innerHTML = username.value;
//
//    //for Email
//    var email = document.getElementById("email");
//    var putemail = document.getElementById("putEmail");
//    putemail.innerHTML = email.value;
//
//    //for app link
//    var applink = document.getElementById("appLink");
//    var putapplink = document.getElementById("putApplink");
//    putapplink.innerHTML = applink.value;
//
// }


//This is for SEPARATE LINKS..

function androidBase() {
    order_type = "BASE_ANDROID";
}

function androidGrowth() {
    order_type = "GROWTH_ANDROID";
}

function androidMaxima() {
    order_type = "MAXIMA_ANDROID";
}

//IOS
function iosBase() {
    order_type = "BASE_IOS";
}

function iosGrowth() {
    order_type = "GROWTH_IOS";
}

function iosMaxima() {
    order_type = "MAXIMA_IOS";
}

//Installs
function installs1000() {
    order_type = "1000_INSTALLS";
}

function installs4500() {
    order_type = "4500_INSTALLS";
}

function installs10000() {
    order_type = "10000_INSTALLS";
}

function installs20000() {
    order_type = "20000_INSTALLS";
}

function installs50000() {
    order_type = "50000_INSTALLS";
}



//Installs ios
function installsIOS100() {
    order_type = "100_INSTALLS_IOS";
}

function installsIOS450() {
    order_type = "450_INSTALLS_IOS";
}

function installsIOS1000(){
    order_type = "1000_INSTALLS_IOS";
}

function installsIOS2000() {
    order_type = "2000_INSTALLS_IOS";
}

function installsIOS5000() {
    order_type = "5000_INSTALLS_IOS";
}



//function move() {
//    var elem = document.getElementById("myBar");
//    var width = 1;
//    var id = setInterval(frame, 25);
//    function frame() {
//
//        document.getElementById("collapse").style.display = "block";
//
//        if (width >= 100) {
//            clearInterval(id);
//
//            window.open(paypallink,"_self");
//        } else {
//            width++;
//            elem.style.width = width + '%';
//        }
//    }
//}

//$(document).ready(function(){
//    $(".confirm-page-btn-submit").click(function(){
//        $("hidden").addClass("intro");
//        document.write(f);
//    });
//});

$(window).resize(function(){
   //console.log('resize called');
   var width = $(window).width();
   if(width >= 350 && width <= 800){
       $('.right').removeClass('pull-right').addClass('pull-left');
        $('.media').removeClass('text-right');
   }
   else{
       $('#myelement').removeClass('width6').addClass('width8');
   }
})
.resize();//trigger the resize event on page load.
