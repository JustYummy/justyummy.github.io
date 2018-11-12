// 全局切换，不过黑色刷新出现白色闪动。原因是预先加载了白色css

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
  if (getThemeCSSName() == 'light') {
    addDarkTheme()
    addDarkThemeColor();
    setCookie('theme', 'dark')
  } else {
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
    addDarkThemeColor();
    setCookie('theme', 'dark')
  }
}

$(document).ready(function () {
  useDarkTheme(getThemeCSSName() == 'dark');
})

function addDarkThemeColor() {    //添加Chrome状态栏颜色
  var meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = '#1d1f21'
  document.getElementsByTagName("head")[0].appendChild(meta);
}

function setCookie(name, value) {
  var expdate = new Date();
  let expdays = 7
  //设置Cookie过期日期
  expdate.setDate(expdate.getDate() + expdays);
  //添加Cookie
  // console.log(name + "=" + escape(value) + ";path=/;expires=" + expdate.toUTCString())
  document.cookie = name + "=" + escape(value) + ";path=/;expires=" + expdate.toUTCString();
}

function getCookie(name) {
  //获取name在Cookie中起止位置
  var start = document.cookie.indexOf(name + "=");
  console.log(document.cookie)
  if (start != -1) {
    start = start + name.length + 1;
    //获取value的终止位置
    var end = document.cookie.indexOf(";", start);
    if (end == -1)
      end = document.cookie.length;
    //截获cookie的value值,并返回
    console.log(document.cookie.substring(start, end))
    return unescape(document.cookie.substring(start, end));
  }
  return "";
}

function delCookie(name) {
  setCookie(name, "", -1);
}

