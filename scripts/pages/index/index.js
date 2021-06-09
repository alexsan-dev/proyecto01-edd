"use strict";
var localInitDarkValue = window.localStorage.getItem('darkmode') === '1';
var darkBtn = document.querySelector('#darkmode-btn > .icon-moon');
var toggleDarkBtn = function () {
    var darkValue = window.localStorage.getItem('darkmode') === '1';
    setIconDark(!darkValue);
    toggleDarkMode();
};
var setIconDark = function (darkValue) {
    if (darkBtn)
        darkBtn.className = darkValue ? 'icon-sun' : 'icon-moon';
};
setIconDark(localInitDarkValue);
