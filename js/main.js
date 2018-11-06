/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

function addDarkTheme() {
  var link = document.createElement('link');
  link.type = 'text/css';
  link.id = "theme-dark";  
  link.rel = 'stylesheet';
  link.href = '/css/style2.css';
  document.getElementsByTagName("head")[0].appendChild(link);
}

function removeDarkTheme() {
  $('#theme-dark').remove();
}

function sclick() {
  // alert("Can not change theme");
  // alert(cout)
  // alert(getThemeCSSName() == 'dark')
  if (getThemeCSSName() == 'light') {
    addDarkTheme()
    setCookie('theme', 'dark')
  }else{
    removeDarkTheme()
    setCookie('theme', 'light')
  }
}

function getThemeCSSName() {
  return getCookie('theme') || "light";
}

function useDarkTheme(useDark) {
  if (useDark) {
      addDarkTheme();
      setCookie('theme', 'dark')
  } 
}

$(document).ready(function () {
  useDarkTheme(getThemeCSSName() == 'dark');
})


function setCookie ( name, value )
{
    var expdate = new Date();
    let expdays = 7
    //设置Cookie过期日期
    expdate.setDate(expdate.getDate() + expdays) ;
    //添加Cookie
    // console.log(name + "=" + escape(value) + ";path=/;expires=" + expdate.toUTCString())
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + expdate.toUTCString();
}

function getCookie ( name )
{
    //获取name在Cookie中起止位置
    var start = document.cookie.indexOf(name+"=") ;
    console.log(document.cookie)
    if ( start != -1 )
    {
        start = start + name.length + 1 ;
        //获取value的终止位置
        var end = document.cookie.indexOf(";", start) ;
        if ( end == -1 )
            end = document.cookie.length ;
        //截获cookie的value值,并返回
        console.log(document.cookie.substring(start,end))
        return unescape(document.cookie.substring(start,end)) ;
    }
    return "" ;
}

function delCookie ( name )
{
    setCookie ( name, "", -1 ) ;
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    } 
  }
});
