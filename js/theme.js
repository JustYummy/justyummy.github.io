
function addLightTheme() {
  var link = document.createElement('link');
  link.id = "theme-light";  
  link.rel = 'stylesheet';
  link.href = '/css/style.css';
  document.getElementsByTagName("head")[0].appendChild(link);
}

function removeLightTheme() {
  $('#theme-light').remove();
}

function addDarkTheme() {
  var link = document.createElement('link');
  link.id = "theme-dark";  
  link.rel = 'stylesheet';
  link.href = '/css/style2.css';
  document.getElementsByTagName("head")[0].appendChild(link);
}

function removeDarkTheme() {
  $('#theme-dark').remove();
}



function sclick() {
  if (getThemeCSSName() == 'light') {
    addDarkTheme()
    setCookie('theme', 'dark')
    // setTimeout(function(){runDarkCode()}, 50)  //延迟执行避免由乱码
  }else{
    addLightTheme()
    setTimeout(function(){runLightCode()}, 50)
    
  }
}

// function runDarkCode(){
//     // removeLightTheme()
//     setCookie('theme', 'dark')
// }

function runLightCode() {
    removeDarkTheme()
    setCookie('theme', 'light')
}

function getThemeCSSName() {
  return getCookie('theme') || "light";
}

$(document).ready(function () {
  if (getThemeCSSName() == 'light') {
    removeDarkTheme()
    setCookie('theme', 'light')
  }else{
    // removeLightTheme()
    setCookie('theme', 'dark')
  }
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