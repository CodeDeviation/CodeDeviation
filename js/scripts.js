// scrolling Navbar-Logo

$(document).ready(function() {
  $(window).scroll(function() {
    var checkUndefined = $("#navigation.navbar-collapse").attr("aria-expanded");
    console.log(checkUndefined);
    if (!checkUndefined) {
        var navbarColor = "255,255,255";//color attr for rgba
        var smallLogoHeight = $('.small-logo').height();
        var bigLogoHeight = $('.big-logo').height();
        var navbarHeight = $('.navbar').height();

        var smallLogoEndPos = 0;
        var smallSpeed = (smallLogoHeight / bigLogoHeight);

        var ySmall = ($(window).scrollTop() * smallSpeed);

        var smallPadding = navbarHeight - ySmall;
        if (smallPadding > navbarHeight) { smallPadding = navbarHeight; }
        if (smallPadding < smallLogoEndPos) { smallPadding = smallLogoEndPos; }
        if (smallPadding < 0) { smallPadding = 0; }

        $('.small-logo-container ').css({ "padding-top": smallPadding});

        var navOpacity = ySmall / smallLogoHeight;
        if  (navOpacity > 1) { navOpacity = 1; }
        if (navOpacity < 0.4 ) { navOpacity = 0.4; }
        var navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
        $('.navbar').css({"background-color": navBackColor});

        var shadowOpacity = navOpacity;
        if ( ySmall > 1) {
          $('.navbar').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"});
        } else {
          $('.navbar').css({"box-shadow": "none"});
        }
    } 
  });
});
